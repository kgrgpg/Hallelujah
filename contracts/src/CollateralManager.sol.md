Here is the Markdown documentation for your `CollateralManager.sol` file.

---

# CollateralManager.sol

## Overview
`CollateralManager` is a smart contract that manages the collateral deposits and withdrawals for both native and ERC20 assets. It ensures that only supported assets are used as collateral and provides functionalities to deposit, withdraw, and calculate the total USD value of the collateral.

## Dependencies
- OpenZeppelin Contracts:
  - `IERC20.sol`: Interface for ERC20 standard.
  - `Ownable.sol`: Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions.
- `IPriceOracle.sol`: Interface for the price oracle used to fetch the price of supported assets.

## State Variables
- `priceOracle`: An instance of the `IPriceOracle` used to get the price of assets.
- `Collateral` struct: Represents the collateral details including user address, amount, and asset.
- `collateralBalances`: A nested mapping that stores collateral balances for each user and asset.
- `supportedERC20Assets`: A mapping that stores the addresses of supported ERC20 assets.
- `supportedNativeAssets`: A mapping that stores the support status of native assets.

## Events
- `CollateralDeposited`: Emitted when collateral is deposited.
- `CollateralWithdrawn`: Emitted when collateral is withdrawn.

## Constructor
- `constructor(address _priceOracleAddress)`: Initializes the contract with the price oracle address and sets up supported assets.

## Modifiers
- `onlySupportedNativeAsset(string memory asset)`: Ensures the provided asset is a supported native asset.
- `onlySupportedERC20Asset(string memory asset)`: Ensures the provided asset is a supported ERC20 asset.

## Functions
### Public Functions
- `setSupportedERC20Asset(string memory asset, address tokenAddress)`: Adds or updates a supported ERC20 asset.
- `setSupportedNativeAsset(string memory asset, bool supported)`: Adds or updates a supported native asset.
- `depositNativeCollateral(string memory asset) payable`: Allows users to deposit native assets (e.g., ETH) as collateral.
- `withdrawNativeCollateral(string memory asset, uint256 amount)`: Allows users to withdraw native assets from their collateral.
- `depositERC20Collateral(string memory asset, uint256 amount)`: Allows users to deposit ERC20 tokens as collateral.
- `withdrawERC20Collateral(string memory asset, uint256 amount)`: Allows users to withdraw ERC20 tokens from their collateral.
- `getCollateralBalance(address user, string memory asset) view returns (uint256)`: Returns the collateral balance of a specific asset for a user.
- `getUSDValue(address user) view returns (uint256)`: Calculates and returns the total USD value of a user's collateral.

## Usage
### Deploying the Contract
- Deploy the `CollateralManager` contract by providing the address of the `PriceOracle` contract.

### Adding Supported Assets
- Use `setSupportedERC20Asset` to add supported ERC20 assets.
- Use `setSupportedNativeAsset` to add supported native assets.

### Depositing Collateral
- Use `depositNativeCollateral` to deposit native assets (ETH).
- Use `depositERC20Collateral` to deposit ERC20 tokens.

### Withdrawing Collateral
- Use `withdrawNativeCollateral` to withdraw native assets.
- Use `withdrawERC20Collateral` to withdraw ERC20 tokens.

### Checking Balances and Value
- Use `getCollateralBalance` to check the collateral balance for a specific asset.
- Use `getUSDValue` to get the total USD value of a user's collateral.

---

If you have any other files to document or any further questions, feel free to upload them, and I'll help you generate the corresponding markdown files!
