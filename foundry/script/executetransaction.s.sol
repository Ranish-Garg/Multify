// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "account-abstraction/core/EntryPoint.sol";
import "account-abstraction/interfaces/PackedUserOperation.sol";
import "../src/Account.sol";

contract ExecuteTransaction is Script {
    
    // You provide these addresses
    address constant ENTRY_POINT = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
    address constant SMART_ACCOUNT = 0x742d35cc82122A4c2A5BEf2E8f7E6a1F3B8c9a2E; // Replace with your smart account address
    
    // Transaction to execute
    uint256 constant PROPOSAL_ID = 0; // ID of the proposal to execute
    
    // Private keys for threshold signatures (Anvil keys)
    uint256 constant KEY_1 = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    uint256 constant KEY_2 = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
    
    function run() public {
        address signer1 = vm.addr(KEY_1);
        address signer2 = vm.addr(KEY_2);
        
        vm.startBroadcast(KEY_1);
        
        console.log("Executing transaction...");
        console.log("Smart Account:", SMART_ACCOUNT);
        console.log("Proposal ID:", PROPOSAL_ID);
        console.log("Signer 1:", signer1);
        console.log("Signer 2:", signer2);
        
        // Get nonce from EntryPoint
        uint256 nonce = IEntryPoint(ENTRY_POINT).getNonce(SMART_ACCOUNT, 0);
        console.log("Account nonce:", nonce);
        
        // Create callData for executetransaction
        bytes memory callData = abi.encodeWithSignature(
            "executetransaction(uint256)",
            PROPOSAL_ID
        );
        
        // Create UserOperation for signing
        PackedUserOperation memory userOp = PackedUserOperation({
            sender: SMART_ACCOUNT,
            nonce: nonce,
            initCode: "", // No initCode needed - account already exists
            callData: callData,
            accountGasLimits: bytes32(abi.encodePacked(uint128(150000), uint128(150000))),
            preVerificationGas: 50000,
            gasFees: bytes32(abi.encodePacked(uint128(1000000000), uint128(1000000000))),
            paymasterAndData: "",
            signature: "" // Will add combined signatures
        });
        
        // Generate UserOpHash
        bytes32 userOpHash = IEntryPoint(ENTRY_POINT).getUserOpHash(userOp);
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", userOpHash));
        
        console.log("Generating threshold signatures...");
        
        // Generate signature from signer 1
        (uint8 v1, bytes32 r1, bytes32 s1) = vm.sign(KEY_1, ethSignedHash);
        bytes memory sig1 = abi.encodePacked(r1, s1, v1);
        
        // Generate signature from signer 2
        (uint8 v2, bytes32 r2, bytes32 s2) = vm.sign(KEY_2, ethSignedHash);
        bytes memory sig2 = abi.encodePacked(r2, s2, v2);
        
        // Combine signatures (concatenate them)
        bytes memory combinedSignature = abi.encodePacked(sig1, sig2);
        userOp.signature = combinedSignature;
        
        console.log("Combined signature length:", combinedSignature.length);
        console.log("Expected: 130 bytes (65 * 2 signers)");
        
        // Send UserOp to EntryPoint
        PackedUserOperation[] memory userOps = new PackedUserOperation[](1);
        userOps[0] = userOp;
        
        console.log("Sending UserOperation with threshold signatures...");
        
        IEntryPoint(ENTRY_POINT).handleOps(userOps, payable(signer1));
        
        console.log("Transaction executed successfully!");
        console.log("Check smart account balance and proposal status");
        
        vm.stopBroadcast();
    }
}