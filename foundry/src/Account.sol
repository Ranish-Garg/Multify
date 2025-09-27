// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@account-abstraction/contracts/interfaces/IAccount.sol";
import {PackedUserOperation} from "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";


contract Account is IAccount
{
    address public immutable entryPoint;
    address[] owners;
    uint256 threshold;
    mapping (address => bool) public isowner;
    mapping (bytes32 => mapping(address => bool)) public isConfirmed;


    constructor(address[] memory _owners,uint256 _threshold, address _entryPoint)
    {
        require(_owners.length >=3, "At least 3 owners required");
        require(_threshold > 1 && _threshold <= _owners.length, "Invalid threshold");
        owners = _owners;
        threshold = _threshold;
        entryPoint = _entryPoint;

        for (uint256 i = 0; i < _owners.length; i++) {
            isowner[_owners[i]] = true;
        }
    }


    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData)
    {
        // Implement your validation logic here
        require(msg.sender == entryPoint, "Caller is not EntryPoint");
        uint256 numberofsigners = userOp.signature.length / 65;

        bytes4 selector = bytes4(userOp.callData[:4]);
         
         if(selector== this.proposetransaction.selector)
         {
            require(numberofsigners==1, "Only one signature allowed for transaction creation");
            bytes32 ethsignedHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
            address signer = ECDSA.recover(ethsignedHash, userOp.signature);
            
            require(isowner[signer], "Signature not from an owner");

         }
         uint8 flag=0;
         if(selector ==this.executetransaction.selector)
         {
            require(numberofsigners == threshold, "a threshold is required to execute the transaction");
            for(uint i=0;i<=numberofsigners;i++)
            {
                 bytes memory signersig = userOp.signature[65*i:65*(i+1)];
                bytes32 ethsignedHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
                address signer = ECDSA.recover(ethsignedHash, signersig);

                if(isowner[signer]==true)
                {
                    flag++;
                }
                else{
                    revert("Signature not from an owner");
                }

                require(flag>=threshold,"Not enough valid signatures");
            }

         }

    }

    function proposetransaction(PackedUserOperation calldata userOp) external 
    {
        require(msg.sender == entryPoint,"Caller is not EntryPoint");

    }
    function executetransaction() external
    {
        require(msg.sender == entryPoint,"Caller is not EntryPoint");
    }
}

contract AccountFactory
{
    address public immutable entryPoint;
    constructor(address _entryPoint)
    {
        entryPoint = _entryPoint;
    }
    function createAccount(address _owner,bytes32 _salt) external returns (address) {

        require(msg.sender == entryPoint,"Caller is not EntryPoint");

        bytes memory bytecode = abi.encodePacked(type(Account).creationCode,abi.encode(_owner));

        address addr = Create2.computeAddress(_salt, keccak256(bytecode)); 

        uint256 codeSize = addr.code.length;
        if (codeSize != 0) {
            return addr;
        }

        return Create2.deploy(0, _salt, bytecode);
    }
}