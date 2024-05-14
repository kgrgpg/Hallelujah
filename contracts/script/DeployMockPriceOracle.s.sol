// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockPriceOracle.sol";

contract DeployMockPriceOracle is Script {
    function run() external {
        vm.startBroadcast();
        new MockPriceOracle();
        vm.stopBroadcast();
    }
}
