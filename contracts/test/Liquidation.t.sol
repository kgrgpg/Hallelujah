// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Liquidation.sol";
import "../src/Perpetual.sol";
import "../src/CollateralManager.sol";
import "../src/MockPriceOracle.sol";
import "../src/MockERC20.sol";

contract LiquidationTest is Test {
    Liquidation liquidation;
    Perpetual perpetual;
    CollateralManager collateralManager;
    MockPriceOracle priceOracle;
    MockERC20 usdc;

    function setUp() public {
        priceOracle = new MockPriceOracle();
        collateralManager = new CollateralManager(address(priceOracle));
        perpetual = new Perpetual(address(collateralManager), address(priceOracle));
        liquidation = new Liquidation(address(perpetual));

        // Set initial prices
        priceOracle.setPrice("ETH", 2000 ether);
        priceOracle.setPrice("USDC", 1 ether);
        collateralManager.depositNativeCollateral{value: 10 ether}("ETH");

        usdc = new MockERC20("USD Coin", "USDC", 10000 ether);
    }

    function testLiquidatePosition() public {
        perpetual.openPosition(true, "ETH", 1 ether, 2);
        priceOracle.setPrice("ETH", 1600 ether);
        liquidation.liquidatePosition(address(this), 1600 ether);

        Perpetual.Position memory position = perpetual.getPosition(address(this));
        assertEq(position.amount, 0);
    }
}
