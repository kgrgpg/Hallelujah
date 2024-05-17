Here is the Markdown documentation for your `MockPriceOracle.sol` file.

---

# MockPriceOracle.sol

## Overview
The `MockPriceOracle` contract is a mock implementation of a price oracle. It allows setting and getting prices for different assets, useful for testing and simulation purposes in a decentralized application environment.

## Contract Definition
```solidity
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
```

## State Variables
### `mapping(string => uint256) private prices`
- A mapping to store the prices of different assets.
- The key is the asset symbol (e.g., "ETH", "BTC").
- The value is the price of the asset in wei.

## Events
### `PriceUpdated`
```solidity
event PriceUpdated(string asset, uint256 price);
```
- This event is emitted whenever the price of an asset is updated.
- Parameters:
  - `asset`: The symbol of the asset whose price is updated.
  - `price`: The new price of the asset.

## Functions
### `setPrice`
```solidity
function setPrice(string memory asset, uint256 price) public {
    prices[asset] = price;
    emit PriceUpdated(asset, price);
}
```
#### Description
- Sets the price for a given asset.
- Emits a `PriceUpdated` event after updating the price.

#### Parameters
- `asset` (string memory): The symbol of the asset.
- `price` (uint256): The price of the asset in wei.

#### Visibility
- `public`: This function can be called from within the contract, derived contracts, and externally.

### `getPrice`
```solidity
function getPrice(string memory asset) public view returns (uint256) {
    return prices[asset];
}
```
#### Description
- Retrieves the price for a given asset.

#### Parameters
- `asset` (string memory): The symbol of the asset.

#### Returns
- `uint256`: The price of the asset in wei.

#### Visibility
- `public view`: This function can be called from within the contract, derived contracts, and externally, without modifying the state.

## Usage
The `MockPriceOracle` contract is designed to simulate a price oracle for testing purposes. It allows developers to set arbitrary prices for assets and retrieve them, enabling the testing of smart contracts and decentralized applications that depend on asset prices.

## Example
To set and get the price of an asset using this contract:
```solidity
// Set the price of ETH to 2000 USD (assuming price in wei)
mockPriceOracle.setPrice("ETH", 2000 * 10**18);

// Get the price of ETH
uint256 ethPrice = mockPriceOracle.getPrice("ETH");
```
In this example:
- `"ETH"` is the asset symbol.
- `2000 * 10**18` represents the price of ETH in wei (assuming 18 decimal places).

## Note
This contract is intended for testing purposes and should not be used in production environments, as it lacks security measures and price feed mechanisms found in real-world oracles.

---

If you have any other files to document or any further questions, feel free to upload them, and I'll help you generate the corresponding markdown files!
