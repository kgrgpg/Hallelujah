// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CollateralManager.sol";
import "../src/MockPriceOracle.sol";
import "../src/MockERC20.sol";

contract CollateralManagerTest is Test {
    CollateralManager collateralManager;
    MockPriceOracle priceOracle;
    MockERC20 usdc;

    function setUp() public {
        priceOracle = new MockPriceOracle();
        collateralManager = new CollateralManager(address(priceOracle));

        // Set initial prices for assets
        priceOracle.setPrice("ETH", 2000 ether);
        priceOracle.setPrice("USDC", 1 ether);
        priceOracle.setPrice("WBTC", 30000 ether);

        usdc = new MockERC20("USD Coin", "USDC", 10000 ether);
    }

    function testDepositNativeCollateral() public {
        collateralManager.depositNativeCollateral{value: 1 ether}("ETH");
        uint256 balance = collateralManager.getCollateralBalance(address(this), "ETH");
        assertEq(balance, 1 ether);
    }

    function testWithdrawNativeCollateral() public {
        collateralManager.depositNativeCollateral{value: 2 ether}("ETH");
        collateralManager.withdrawNativeCollateral("ETH", 1 ether);

        uint256 balance = collateralManager.getCollateralBalance(address(this), "ETH");
        assertEq(balance, 1 ether);
    }

    function testDepositERC20Collateral() public {
        collateralManager.setSupportedERC20Asset("USDC", address(usdc));
        usdc.approve(address(collateralManager), 500 ether);
        collateralManager.depositERC20Collateral("USDC", 500 ether);

        uint256 balance = collateralManager.getCollateralBalance(address(this), "USDC");
        assertEq(balance, 500 ether);
    }

    function testWithdrawERC20Collateral() public {
        collateralManager.setSupportedERC20Asset("USDC", address(usdc));
        usdc.approve(address(collateralManager), 500 ether);
        collateralManager.depositERC20Collateral("USDC", 500 ether);
        collateralManager.withdrawERC20Collateral("USDC", 250 ether);

        uint256 balance = collateralManager.getCollateralBalance(address(this), "USDC");
        assertEq(balance, 250 ether);
    }

    function testGetUSDValue() public {
        collateralManager.depositNativeCollateral{value: 1 ether}("ETH");
        collateralManager.setSupportedERC20Asset("USDC", address(usdc));
        usdc.approve(address(collateralManager), 500 ether);
        collateralManager.depositERC20Collateral("USDC", 500 ether);

        uint256 totalUSDValue = collateralManager.getUSDValue(address(this));
        assertEq(totalUSDValue, 2500 ether);
    }
}
