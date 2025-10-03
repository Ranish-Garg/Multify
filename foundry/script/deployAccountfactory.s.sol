// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {AccountFactory} from "../src/Account.sol";

contract deployaccountfactory is Script {
    AccountFactory public accountfactory;
    address constant EntrypointAddress = 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        accountfactory = new AccountFactory(EntrypointAddress);

        vm.stopBroadcast();
    }
}