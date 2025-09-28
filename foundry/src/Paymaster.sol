// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


import "@account-abstraction/contracts/interfaces/IPaymaster.sol";
import {PackedUserOperation} from "@account-abstraction/contracts/interfaces/PackedUserOperation.sol";


contract Paymaster is IPaymaster
{
    address public immutable entryPoint;

    constructor(address _entryPoint)
    {
        entryPoint = _entryPoint;
    }

    function validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) external returns (bytes memory context, uint256 validationData)
    {
        require(msg.sender == entryPoint,"Caller is not EntryPoint");
        context = new bytes(0);
        validationData = 0;
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256 actualUserOpFeePerGas
    ) external{

    }
}