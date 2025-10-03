// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "account-abstraction/core/EntryPoint.sol";
import "account-abstraction/interfaces/PackedUserOperation.sol";
import "account-abstraction/interfaces/IEntryPoint.sol";
import {Account, AccountFactory} from "../src/Account.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

contract CreateSmartAccount is Script {
    
    // You provide these addresses
    address constant ENTRY_POINT = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;
    address constant ACCOUNT_FACTORY = 0x742d35cc82122A4c2A5BEf2E8f7E6a1F3B8c9a2E; // Replace with your factory
    
    // Random owners for testing
    address constant OWNER_1 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address constant OWNER_2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address constant OWNER_3 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    
    function run() public {
        uint256 privateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        
        vm.startBroadcast(privateKey);
        
        console.log("Creating Smart Account via UserOperation...");
        
        // Setup parameters
        address[] memory owners = new address[](3);
        owners[0] = OWNER_1;
        owners[1] = OWNER_2;
        owners[2] = OWNER_3;
        
        uint256 threshold = 2;
        bytes32 salt = bytes32(uint256(12345));
        
        // Create initCode
        bytes memory initCode = abi.encodePacked(
            ACCOUNT_FACTORY,
            abi.encodeWithSignature(
                "createAccount(address[],uint256,bytes32)",
                owners,
                threshold,
                salt
            )
        );
        
        console.log("Creating account with owners:", owners.length);
        console.log("Threshold:", threshold);
        
        // Deploy EntryPoint first
        EntryPoint entryPoint = new EntryPoint();
        console.log("EntryPoint deployed at:", address(entryPoint));
        
        // Deploy AccountFactory with EntryPoint
        AccountFactory factory = new AccountFactory(address(entryPoint));
        console.log("AccountFactory deployed at:", address(factory));
        
        // Update initCode to use deployed factory
        initCode = abi.encodePacked(
            address(factory),
            abi.encodeWithSignature(
                "createAccount(address[],uint256,bytes32)",
                owners,
                threshold,
                salt
            )
        );
        
        // IMPORTANT: In ERC-4337, you must predict the account address BEFORE it exists
        // This is done using CREATE2 deterministic deployment
            address predictedAccount;
        (bool success, bytes memory returnData) = address(IEntryPoint(ENTRY_POINT)).call(
        abi.encodeWithSelector(IEntryPoint.getSenderAddress.selector, initCode)
        );

        if (!success) {
    // Decode the custom revert to extract the address
         bytes memory addrBytes = new bytes(returnData.length - 4);
         for (uint256 i = 4; i < returnData.length; i++) {
             addrBytes[i - 4] = returnData[i];
         }
         predictedAccount = abi.decode(addrBytes, (address));
    // use predictedAccount...
            }
        // address predictedAccount = address(
        //     uint160(
        //         uint256(
        //             keccak256(
        //                 abi.encodePacked(
        //                     bytes1(0xff),
        //                     address(factory),
        //                     salt,
        //                     keccak256("AccountBytecodeHash") // This should be actual bytecode hash
        //                 )
        //             )
        //         )
        //     )
        // );
        
        console.log("Predicted Account Address:", predictedAccount);
        
        // KEY POINT: For new accounts, nonce is ALWAYS 0
        // We DON'T call entryPoint.getNonce() because account doesn't exist yet!
       
        
        
        // Create UserOperation for account deployment
        PackedUserOperation memory userOp = PackedUserOperation({
            sender: predictedAccount,
            nonce: 0,
            initCode: initCode,
            callData: "", // No call data for deployment
            accountGasLimits: bytes32(abi.encodePacked(uint128(1000000), uint128(1000000))), // verification + call gas
            preVerificationGas: 100000,
            gasFees: bytes32(abi.encodePacked(uint128(1000000000), uint128(2000000000))), // priority + max fee
            paymasterAndData: "", // No paymaster
            signature: "0x" // Will be set by account validation
        });
        
        console.log("UserOperation created for sender:", userOp.sender);
        console.log("InitCode length:", initCode.length);
        
        // Create UserOps array (EntryPoint expects array)
        PackedUserOperation[] memory userOps = new PackedUserOperation[](1);
        userOps[0] = userOp;
        
        // Call EntryPoint to process the UserOperation
        console.log("Calling EntryPoint.handleOps...");
        
        try entryPoint.handleOps(userOps, payable(msg.sender)) {
            console.log("UserOperation processed successfully!");
            console.log("Account should be deployed at:", predictedAccount);
        } catch Error(string memory reason) {
            console.log("UserOperation failed:", reason);
        } catch {
            console.log("UserOperation failed with unknown error");
        }
        
        console.log("=== Smart Account Creation via EntryPoint Complete ===");
        
        vm.stopBroadcast();
    }
}