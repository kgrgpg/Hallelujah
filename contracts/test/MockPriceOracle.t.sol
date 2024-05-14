// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MockPriceOracle.sol";

contract MockPriceOracleTest is Test {
    MockPriceOracle priceOracle;

    function setUp() public {
        priceOracle = new MockPriceOracle();
    }

    function testSetAndGetPrice() public {
        priceOracle.setPrice("ETH", 2000 ether);
        uint256 ethPrice = priceOracle.getPrice("ETH");
        assertEq(ethPrice, 2000 ether);
    }
}
