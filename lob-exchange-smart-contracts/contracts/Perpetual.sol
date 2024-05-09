// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CollateralManager.sol";
import "./IPriceOracle.sol";

contract Perpetual {
    CollateralManager private collateralManager;
    IPriceOracle private priceOracle;
    address public owner;
    uint256 public maxLeverage = 10; // Maximum allowed leverage (e.g., 10x)

    struct Position {
        address user;
        uint256 amount;
        bool isLong;
        string asset;
        uint256 entryPrice;
        uint256 liquidationPrice;
        uint256 fundingRate; // Funding rate adjustment
    }

    mapping(address => Position) public positions;
    uint256 public longPositions;
    uint256 public shortPositions;

    event PositionOpened(address indexed user, bool isLong, string asset, uint256 amount, uint256 entryPrice, uint256 leverage);
    event PositionClosed(address indexed user, bool isLong, string asset, uint256 amount, uint256 exitPrice);
    event FundingRateAdjusted(address indexed user, uint256 fundingRate);
    event PositionLiquidated(address indexed user, string asset, uint256 amount, uint256 liquidationPrice);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyPositionOwner(address user) {
        require(msg.sender == user, "Not authorized");
        _;
    }

    constructor(address _collateralManagerAddress, address _priceOracleAddress) {
        collateralManager = CollateralManager(_collateralManagerAddress);
        priceOracle = IPriceOracle(_priceOracleAddress);
        owner = msg.sender;
    }

    function setMaxLeverage(uint256 _maxLeverage) public onlyOwner {
        maxLeverage = _maxLeverage;
    }

    function openPosition(bool isLong, string memory asset, uint256 amount, uint256 leverage) public {
        require(leverage <= maxLeverage, "Leverage exceeds maximum allowed");
        uint256 requiredCollateral = amount / leverage;
        require(collateralManager.getUSDValue(msg.sender) >= requiredCollateral, "Insufficient collateral");

        uint256 entryPrice = priceOracle.getPrice(asset);
        uint256 fundingRate = calculateFundingRate(isLong);
        uint256 maintenanceMargin = calculateMaintenanceMargin(amount, leverage);
        uint256 liquidationPrice = calculateLiquidationPrice(isLong, entryPrice, amount, maintenanceMargin);

        positions[msg.sender] = Position({
            user: msg.sender,
            amount: amount,
            isLong: isLong,
            asset: asset,
            entryPrice: entryPrice,
            liquidationPrice: liquidationPrice,
            fundingRate: fundingRate
        });

        if (isLong) {
            longPositions += amount;
        } else {
            shortPositions += amount;
        }

        emit PositionOpened(msg.sender, isLong, asset, amount, entryPrice, leverage);
        emit FundingRateAdjusted(msg.sender, fundingRate);
    }

    function closePosition(uint256 exitPrice) public onlyPositionOwner(msg.sender) {
        Position storage position = positions[msg.sender];
        require(position.amount > 0, "No open position");

        if (position.isLong) {
            longPositions -= position.amount;
        } else {
            shortPositions -= position.amount;
        }

        emit PositionClosed(msg.sender, position.isLong, position.asset, position.amount, exitPrice);
        delete positions[msg.sender];
    }

    function calculateLiquidationPrice(
        bool isLong,
        uint256 entryPrice,
        uint256 amount,
        uint256 maintenanceMargin
    ) public pure returns (uint256) {
        uint256 leverage = amount / maintenanceMargin;
        uint256 priceMovement = (entryPrice * leverage) / 100;

        return isLong ? entryPrice - priceMovement : entryPrice + priceMovement;
    }

    function calculateMaintenanceMargin(uint256 amount, uint256 leverage) public pure returns (uint256) {
        // Example: Assume maintenance margin is 10% of the position amount divided by leverage
        return (amount / leverage) * 10 / 100;
    }

    function calculateFundingRate(bool isLong) public view returns (uint256) {
        uint256 imbalance = isLong ? longPositions - shortPositions : shortPositions - longPositions;
        return imbalance / 100; // Example: 1% funding rate
    }

    function getPosition(address user) public view returns (Position memory) {
        return positions[user];
    }

    function liquidatePosition(address user) public {
        Position memory position = positions[user];
        uint256 currentPrice = priceOracle.getPrice(position.asset);

        require(
            (position.isLong && currentPrice < position.liquidationPrice) ||
            (!position.isLong && currentPrice > position.liquidationPrice),
            "Position is not under-collateralized"
        );

        closePositionInternal(user, currentPrice);
        emit PositionLiquidated(user, position.asset, position.amount, currentPrice);
    }

    function closePositionInternal(address user, uint256 exitPrice) internal {
        Position storage position = positions[user];
        require(position.amount > 0, "No open position");

        if (position.isLong) {
            longPositions -= position.amount;
        } else {
            shortPositions -= position.amount;
        }

        emit PositionClosed(user, position.isLong, position.asset, position.amount, exitPrice);
        delete positions[user];
    }
}
