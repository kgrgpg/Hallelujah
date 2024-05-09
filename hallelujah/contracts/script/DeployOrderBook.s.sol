// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/OrderBook.sol";

contract DeployOrderBook is Script {
    function run() external {
        vm.startBroadcast();
        new OrderBook();
        vm.stopBroadcast();
    }
}
