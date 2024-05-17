Here's the Markdown documentation for your `Perpetual.sol` file.

---

# Perpetual.sol

## Overview
The `Perpetual` contract manages perpetual positions, allowing users to open and close leveraged long or short positions on various assets. The contract integrates with a `CollateralManager` to verify collateral and a `PriceOracle` to fetch current asset prices. It also includes functionalities to handle funding rates and liquidations.

## Contract Definition
```solidity
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

    modifier onlyOwner();
    modifier onlyPositionOwner(address user);

    constructor(address _collateralManagerAddress, address _priceOracleAddress);
    function setMaxLeverage(uint256 _maxLeverage) public onlyOwner;
    function openPosition(bool isLong, string memory asset, uint256 amount, uint256 leverage) public;
    function closePosition(uint256 exitPrice) public onlyPositionOwner(msg.sender);
    function calculateLiquidationPrice(bool isLong, uint256 entryPrice, uint256 amount, uint256 maintenanceMargin) public pure returns (uint256);
    function calculateMaintenanceMargin(uint256 amount, uint256 leverage) public pure returns (uint256);
    function calculateFundingRate(bool isLong) public view returns (uint256);
    function getPosition(address user) public view returns (Position memory);
    function liquidatePosition(address user) public;
    function closePositionInternal(address user, uint256 exitPrice) internal;
}
```

## Structs
### `Position`
Represents a leveraged position.
- `address user`: Address of the user who owns the position.
- `uint256 amount`: Amount of the asset in the position.
- `bool isLong`: Indicates if the position is long (true) or short (false).
- `string asset`: Symbol of the asset.
- `uint256 entryPrice`: Entry price of the position.
- `uint256 liquidationPrice`: Liquidation price of the position.
- `uint256 fundingRate`: Funding rate adjustment for the position.

## State Variables
### `collateralManager`
- `CollateralManager private`: Instance of the `CollateralManager` contract.

### `priceOracle`
- `IPriceOracle private`: Instance of the `IPriceOracle` contract.

### `owner`
- `address public`: Address of the contract owner.

### `maxLeverage`
- `uint256 public`: Maximum allowed leverage for positions.

### `positions`
- `mapping(address => Position) public`: Mapping of user addresses to their positions.

### `longPositions`
- `uint256 public`: Total amount of long positions.

### `shortPositions`
- `uint256 public`: Total amount of short positions.

## Events
### `PositionOpened`
```solidity
event PositionOpened(address indexed user, bool isLong, string asset, uint256 amount, uint256 entryPrice, uint256 leverage);
```
- Emitted when a position is opened.

### `PositionClosed`
```solidity
event PositionClosed(address indexed user, bool isLong, string asset, uint256 amount, uint256 exitPrice);
```
- Emitted when a position is closed.

### `FundingRateAdjusted`
```solidity
event FundingRateAdjusted(address indexed user, uint256 fundingRate);
```
- Emitted when the funding rate is adjusted.

### `PositionLiquidated`
```solidity
event PositionLiquidated(address indexed user, string asset, uint256 amount, uint256 liquidationPrice);
```
- Emitted when a position is liquidated.

## Modifiers
### `onlyOwner`
Ensures that only the contract owner can call the function.
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not authorized");
    _;
}
```

### `onlyPositionOwner`
Ensures that only the owner of the position can call the function.
```solidity
modifier onlyPositionOwner(address user) {
    require(msg.sender == user, "Not authorized");
    _;
}
```

## Functions
### `constructor`
Initializes the contract with addresses for the collateral manager and price oracle.
```solidity
constructor(address _collateralManagerAddress, address _priceOracleAddress) {
    collateralManager = CollateralManager(_collateralManagerAddress);
    priceOracle = IPriceOracle(_priceOracleAddress);
    owner = msg.sender;
}
```

### `setMaxLeverage`
Sets the maximum leverage allowed for positions.
```solidity
function setMaxLeverage(uint256 _maxLeverage) public onlyOwner {
    maxLeverage = _maxLeverage;
}
```

### `openPosition`
Opens a new leveraged position.
```solidity
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
```

### `closePosition`
Closes an existing position.
```solidity
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
```

### `calculateLiquidationPrice`
Calculates the liquidation price for a position.
```solidity
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
```

### `calculateMaintenanceMargin`
Calculates the maintenance margin for a position.
```solidity
function calculateMaintenanceMargin(uint256 amount, uint256 leverage) public pure returns (uint256) {
    // Example: Assume maintenance margin is 10% of the position amount divided by leverage
    return (amount / leverage) * 10 / 100;
}
```

### `calculateFundingRate`
Calculates the funding rate based on the imbalance of long and short positions.
```solidity
function calculateFundingRate(bool isLong) public view returns (uint256) {
    uint256 imbalance = isLong ? longPositions - shortPositions : shortPositions - longPositions;
    return imbalance / 100; // Example: 1% funding rate
}
```

### `getPosition`
Retrieves the position for a given user.
```solidity
function getPosition(address user) public view returns (Position memory) {
    return positions[user];
}
```

### `liquidatePosition`
Liquidates a position if it is under-collateralized.
```solidity
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
```

### `closePositionInternal`
Internal function to close a position.
```solidity
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
```

## Usage (continued)
This `Perpetual` contract allows users to open and close leveraged positions on various assets. It includes functions to calculate the liquidation price, maintenance margin, and funding rate. Additionally, the contract handles position liquidations when they are under-collateralized.

### Example Usage

1. **Deploying the Contract**

   Deploy the `Perpetual` contract by providing the addresses of the `CollateralManager` and `PriceOracle` contracts:

   ```solidity
   Perpetual perpetual = new Perpetual(collateralManagerAddress, priceOracleAddress);
   ```

2. **Opening a Position**

   To open a new long or short position, users can call the `openPosition` function with the desired parameters:

   ```solidity
   perpetual.openPosition(true, "ETH", 1000 ether, 5); // Open a long position on ETH with 5x leverage
   ```

3. **Closing a Position**

   Users can close their positions by calling the `closePosition` function and providing the exit price:

   ```solidity
   perpetual.closePosition(1100 ether); // Close the position at the current market price
   ```

4. **Liquidating a Position**

   To liquidate an under-collateralized position, call the `liquidatePosition` function:

   ```solidity
   perpetual.liquidatePosition(userAddress); // Liquidate the user's position if it is under-collateralized
   ```

5. **Adjusting the Maximum Leverage**

   The contract owner can adjust the maximum leverage by calling the `setMaxLeverage` function:

   ```solidity
   perpetual.setMaxLeverage(20); // Set the maximum leverage to 20x
   ```

### Notes
- The contract uses the `CollateralManager` to verify the collateral provided by the user.
- The `PriceOracle` is used to fetch the current market prices for the assets.
- The funding rate is dynamically adjusted based on the imbalance between long and short positions.
- Liquidation logic ensures that under-collateralized positions are automatically closed to protect the protocol from losses.

---

This documentation provides a comprehensive overview of the `Perpetual` contract, including its functionality, usage, and example code snippets. By maintaining detailed Markdown files for each contract, we ensure that the context and purpose of each component are well-documented and easily understandable for future developers or team members.

Let me know which file you want to process next, or if you have any additional questions or modifications.
