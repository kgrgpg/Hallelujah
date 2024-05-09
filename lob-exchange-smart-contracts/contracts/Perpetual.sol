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
    }

    mapping(address => Position) public positions;

    event PositionOpened(address indexed user, bool isLong, uint256 amount, uint256 entryPrice);
    event PositionClosed(address indexed user, bool isLong, uint256 amount, uint256 exitPrice);

    constructor(address _collateralManagerAddress) {
        collateralManager = CollateralManager(_collateralManagerAddress);
    }

    function openPosition(bool isLong, uint256 amount, uint256 entryPrice) public {
        require(collateralManager.getCollateralBalance(msg.sender, "ETH") >= amount, "Insufficient collateral");
        positions[msg.sender] = Position({
            user: msg.sender,
            amount: amount,
            isLong: isLong,
            entryPrice: entryPrice,
            liquidationPrice: isLong ? entryPrice * 8 / 10 : entryPrice * 12 / 10
        });
        emit PositionOpened(msg.sender, isLong, amount, entryPrice);
    }

    function closePosition(uint256 exitPrice) public {
        Position storage position = positions[msg.sender];
        require(position.amount > 0, "No open position");

        emit PositionClosed(msg.sender, position.isLong, position.amount, exitPrice);
        delete positions[msg.sender];
    }

    function getPosition(address user) public view returns (Position memory) {
        return positions[user];
    }
}
