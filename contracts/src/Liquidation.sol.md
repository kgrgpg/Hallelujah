Here is the Markdown documentation for your `Liquidation.sol` file.

---

# Liquidation.sol

## Overview
The `Liquidation` contract is responsible for handling the liquidation of under-collateralized positions in a perpetual contract. It interacts with the `Perpetual` contract to determine the positions that need to be liquidated and execute the liquidation process.

## Imports
```solidity
import "./Perpetual.sol";
```
- `Perpetual.sol`: This import includes the `Perpetual` contract, which contains the logic for managing perpetual positions.

## Contract Variables
### `perpetual`
```solidity
Perpetual private perpetual;
```
- This variable holds an instance of the `Perpetual` contract.

## Events
### `PositionLiquidated`
```solidity
event PositionLiquidated(address indexed user, uint256 amount, uint256 liquidationPrice);
```
- This event is emitted when a position is liquidated.
- `user`: The address of the user whose position was liquidated.
- `amount`: The amount of the position that was liquidated.
- `liquidationPrice`: The price at which the liquidation occurred.

## Constructor
### `constructor`
```solidity
constructor(address _perpetualAddress) {
    perpetual = Perpetual(_perpetualAddress);
}
```
- Initializes the `perpetual` variable with the address of the deployed `Perpetual` contract.

## Functions
### `liquidatePosition`
```solidity
function liquidatePosition(address user, uint256 currentPrice) public {
    Perpetual.Position memory position = perpetual.getPosition(user);

    require(
        (position.isLong && currentPrice < position.liquidationPrice) ||
        (!position.isLong && currentPrice > position.liquidationPrice),
        "Position is not under-collateralized"
    );

    perpetual.closePosition(currentPrice);
    emit PositionLiquidated(user, position.amount, currentPrice);
}
```
#### Description
- This function checks if a user's position is under-collateralized and, if so, liquidates the position.

#### Parameters
- `user` (address): The address of the user whose position is to be liquidated.
- `currentPrice` (uint256): The current market price of the asset.

#### Requirements
- The function checks if the position is under-collateralized:
  - For long positions: the current price must be less than the liquidation price.
  - For short positions: the current price must be greater than the liquidation price.

#### Actions
- If the position is under-collateralized, the function calls `perpetual.closePosition(currentPrice)` to close the position.
- Emits a `PositionLiquidated` event upon successful liquidation.

## Usage
This contract is designed to be used by a liquidator bot or an external account to monitor and liquidate under-collateralized positions in the `Perpetual` contract. It ensures that the system remains solvent by liquidating risky positions.

---

If you have any other files to document or any further questions, feel free to upload them, and I'll help you generate the corresponding markdown files!
