// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "account-abstraction/core/EntryPoint.sol";
import "account-abstraction/interfaces/PackedUserOperation.sol";
import "../src/Account.sol";

contract ProposeTransaction is Script {
    
    // You provide these addresses
    address constant ENTRY_POINT = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
    address constant SMART_ACCOUNT = 0x742d35cc82122A4c2A5BEf2E8f7E6a1F3B8c9a2E; // Replace with your smart account address
    
    // Transaction to propose
    address constant PROPOSAL_TO = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Send to this address
    uint256 constant PROPOSAL_VALUE = 1 ether; // Amount to send
    bytes constant PROPOSAL_DATA = ""; // Empty for ETH transfer
    
    function run() public {
        uint256 privateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        address signer = vm.addr(privateKey);
        
        vm.startBroadcast(privateKey);
        
        console.log("Proposing transaction...");
        console.log("Smart Account:", SMART_ACCOUNT);
        console.log("Proposer:", signer);
        console.log("To:", PROPOSAL_TO);
        console.log("Value:", PROPOSAL_VALUE);
        
        // Get nonce from EntryPoint
        uint256 nonce = IEntryPoint(ENTRY_POINT).getNonce(SMART_ACCOUNT, 0);
        console.log("Account nonce:", nonce);
        
        // Create callData for proposetransaction
        bytes memory callData = abi.encodeWithSignature(
            "proposetransaction(address,uint256,bytes)",
            PROPOSAL_TO,
            PROPOSAL_VALUE,
            PROPOSAL_DATA
        );
        
        // Create UserOperation hash for signing
        PackedUserOperation memory userOp = PackedUserOperation({
            sender: SMART_ACCOUNT,
            nonce: nonce,
            initCode: "", // No initCode needed - account already exists
            callData: callData,
            accountGasLimits: bytes32(abi.encodePacked(uint128(100000), uint128(100000))),
            preVerificationGas: 50000,
            gasFees: bytes32(abi.encodePacked(uint128(1000000000), uint128(1000000000))),
            paymasterAndData: "",
            signature: "" // Will add signature
        });
        
        // Generate signature
        bytes32 userOpHash = IEntryPoint(ENTRY_POINT).getUserOpHash(userOp);
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", userOpHash));
        
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, ethSignedHash);
        bytes memory signature = abi.encodePacked(r, s, v);
        
        userOp.signature = signature;
        
        console.log("Signature generated, sending UserOperation...");
        
        // Send UserOp to EntryPoint
        PackedUserOperation[] memory userOps = new PackedUserOperation[](1);
        userOps[0] = userOp;
        
        IEntryPoint(ENTRY_POINT).handleOps(userOps, payable(signer));
        
        console.log("Transaction proposed successfully!");
        console.log("Check smart account for new proposal");
        
        vm.stopBroadcast();
    }
}