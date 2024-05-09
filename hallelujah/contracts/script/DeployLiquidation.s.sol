// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Liquidation.sol";
import "../src/Perpetual.sol";
import "../src/CollateralManager.sol";
import "../src/MockPriceOracle.sol";

contract DeployLiquidation is Script {
    function run() external {
        vm.startBroadcast();
        MockPriceOracle priceOracle = new MockPriceOracle();
        CollateralManager collateralManager = new CollateralManager(address(priceOracle));
        Perpetual perpetual = new Perpetual(address(collateralManager), address(priceOracle));
        new Liquidation(address(perpetual));
        vm.stopBroadcast();
    }
}
