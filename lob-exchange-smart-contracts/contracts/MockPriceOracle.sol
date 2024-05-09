// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MockPriceOracle {
    mapping(string => uint256) private prices;

    event PriceUpdated(string asset, uint256 price);

    function setPrice(string memory asset, uint256 price) public {
        prices[asset] = price;
        emit PriceUpdated(asset, price);
    }

    function getPrice(string memory asset) public view returns (uint256) {
        return prices[asset];
    }
}
