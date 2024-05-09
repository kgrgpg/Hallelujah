// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IPriceOracle {
    function getPrice(string memory asset) external view returns (uint256);
}
