// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./CollateralManager.sol";

contract Perpetual {
    CollateralManager private collateralManager;

    struct Position {
        address user;
        uint256 amount;
        bool isLong;
        uint256 entryPrice;
        uint256 liquidationPrice;
        uint256 fundingRate; // Funding rate to be adjusted over time
    }

    mapping(address => Position) public positions;
    uint256 public longPositions;
    uint256 public shortPositions;

    event PositionOpened(address indexed user, bool isLong, uint256 amount, uint256 entryPrice);
    event PositionClosed(address indexed user, bool isLong, uint256 amount, uint256 exitPrice);
    event FundingRateAdjusted(address indexed user, uint256 fundingRate);

    constructor(address _collateralManagerAddress) {
        collateralManager = CollateralManager(_collateralManagerAddress);
    }

    function openPosition(bool isLong, uint256 amount, uint256 entryPrice) public {
        require(collateralManager.getUSDValue(msg.sender) >= amount, "Insufficient collateral");

        uint256 fundingRate = calculateFundingRate(isLong);

        positions[msg.sender] = Position({
            user: msg.sender,
            amount: amount,
            isLong: isLong,
            entryPrice: entryPrice,
            liquidationPrice: isLong ? entryPrice * 8 / 10 : entryPrice * 12 / 10,
            fundingRate: fundingRate
        });

        if (isLong) {
            longPositions += amount;
        } else {
            shortPositions += amount;
        }

        emit PositionOpened(msg.sender, isLong, amount, entryPrice);
        emit FundingRateAdjusted(msg.sender, fundingRate);
    }

    function closePosition(uint256 exitPrice) public {
        Position storage position = positions[msg.sender];
        require(position.amount > 0, "No open position");

        if (position.isLong) {
            longPositions -= position.amount;
        } else {
            shortPositions -= position.amount;
        }

        emit PositionClosed(msg.sender, position.isLong, position.amount, exitPrice);
        delete positions[msg.sender];
    }

    function getPosition(address user) public view returns (Position memory) {
        return positions[user];
    }

    function calculateFundingRate(bool isLong) public view returns (uint256) {
        uint256 imbalance = isLong ? longPositions - shortPositions : shortPositions - longPositions;
        return imbalance / 100; // Example: 1% funding rate
    }
}
