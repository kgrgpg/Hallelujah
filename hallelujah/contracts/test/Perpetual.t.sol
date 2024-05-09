// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Perpetual.sol";
import "../src/CollateralManager.sol";
import "../src/MockPriceOracle.sol";
import "../src/MockERC20.sol";

contract PerpetualTest is Test {
    Perpetual perpetual;
    CollateralManager collateralManager;
    MockPriceOracle priceOracle;
    MockERC20 usdc;

    function setUp() public {
        priceOracle = new MockPriceOracle();
        collateralManager = new CollateralManager(address(priceOracle));
        perpetual = new Perpetual(address(collateralManager), address(priceOracle));

        // Set initial prices for assets
        priceOracle.setPrice("ETH", 2000 ether);
        priceOracle.setPrice("USDC", 1 ether);
        collateralManager.depositNativeCollateral{value: 10 ether}("ETH");

        usdc = new MockERC20("USD Coin", "USDC", 10000 ether);
    }

    function testOpenPosition() public {
        perpetual.openPosition(true, "ETH", 1 ether, 2);
        Perpetual.Position memory position = perpetual.getPosition(address(this));
        assertEq(position.amount, 1 ether);
        assertEq(position.isLong, true);
        assertEq(position.asset, "ETH");
    }

    function testClosePosition() public {
        perpetual.openPosition(true, "ETH", 1 ether, 2);
        perpetual.closePosition(2200 ether);
        Perpetual.Position memory position = perpetual.getPosition(address(this));
        assertEq(position.amount, 0);
    }

    function testLiquidatePosition() public {
        perpetual.openPosition(true, "ETH", 1 ether, 2);
        priceOracle.setPrice("ETH", 1600 ether);
        perpetual.liquidatePosition(address(this));
        Perpetual.Position memory position = perpetual.getPosition(address(this));
        assertEq(position.amount, 0);
    }

    function testSetMaxLeverage() public {
        perpetual.setMaxLeverage(15);
        assertEq(perpetual.maxLeverage(), 15);
    }

    function testFundingRateCalculation() public {
        perpetual.openPosition(true, "ETH", 1 ether, 2);
        uint256 fundingRate = perpetual.calculateFundingRate(true);
        assertEq(fundingRate, 1 ether / 100);
    }

    function testLiquidationPriceCalculation() public {
        uint256 liquidationPrice = perpetual.calculateLiquidationPrice(true, 2000 ether, 1 ether, 0.1 ether);
        assertEq(liquidationPrice, 1800 ether);
    }
}
