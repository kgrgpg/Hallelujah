// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPriceOracle.sol";

contract CollateralManager is Ownable {
    IPriceOracle private priceOracle;

    struct Collateral {
        address user;
        uint256 amount;
        string asset;
    }

    mapping(address => mapping(string => uint256)) public collateralBalances;
    mapping(string => address) public supportedERC20Assets;
    mapping(string => bool) public supportedNativeAssets;

    event CollateralDeposited(address indexed user, string asset, uint256 amount);
    event CollateralWithdrawn(address indexed user, string asset, uint256 amount);

    constructor(address _priceOracleAddress) {
        priceOracle = IPriceOracle(_priceOracleAddress);

        // Initialize supported assets
        supportedERC20Assets["USDC"] = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; // Replace with actual USDC address
        supportedERC20Assets["WBTC"] = 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599; // Replace with actual WBTC address
        supportedNativeAssets["ETH"] = true;
    }

    modifier onlySupportedNativeAsset(string memory asset) {
        require(supportedNativeAssets[asset], "Unsupported native asset");
        _;
    }

    modifier onlySupportedERC20Asset(string memory asset) {
        require(supportedERC20Assets[asset] != address(0), "Unsupported ERC20 asset");
        _;
    }

    function setSupportedERC20Asset(string memory asset, address tokenAddress) public onlyOwner {
        supportedERC20Assets[asset] = tokenAddress;
    }

    function setSupportedNativeAsset(string memory asset, bool supported) public onlyOwner {
        supportedNativeAssets[asset] = supported;
    }

    // Deposit native asset (ETH)
    function depositNativeCollateral(string memory asset) public payable onlySupportedNativeAsset(asset) {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        collateralBalances[msg.sender][asset] += msg.value;
        emit CollateralDeposited(msg.sender, asset, msg.value);
    }

    // Withdraw native asset (ETH)
    function withdrawNativeCollateral(string memory asset, uint256 amount) public onlySupportedNativeAsset(asset) {
        require(collateralBalances[msg.sender][asset] >= amount, "Insufficient balance");
        collateralBalances[msg.sender][asset] -= amount;
        payable(msg.sender).transfer(amount);
        emit CollateralWithdrawn(msg.sender, asset, amount);
    }

    // Deposit ERC20 collateral (e.g., USDC, WBTC)
    function depositERC20Collateral(string memory asset, uint256 amount) public onlySupportedERC20Asset(asset) {
        require(amount > 0, "Deposit amount must be greater than zero");
        address tokenAddress = supportedERC20Assets[asset];
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        collateralBalances[msg.sender][asset] += amount;
        emit CollateralDeposited(msg.sender, asset, amount);
    }

    // Withdraw ERC20 collateral (e.g., USDC, WBTC)
    function withdrawERC20Collateral(string memory asset, uint256 amount) public onlySupportedERC20Asset(asset) {
        require(collateralBalances[msg.sender][asset] >= amount, "Insufficient balance");
        collateralBalances[msg.sender][asset] -= amount;
        address tokenAddress = supportedERC20Assets[asset];
        IERC20(tokenAddress).transfer(msg.sender, amount);
        emit CollateralWithdrawn(msg.sender, asset, amount);
    }

    // Get collateral balance for a specific asset
    function getCollateralBalance(address user, string memory asset) public view returns (uint256) {
        return collateralBalances[user][asset];
    }

    // Calculate the total USD value of collateral for a user
    function getUSDValue(address user) public view returns (uint256) {
        uint256 totalUSDValue = 0;
        string[3] memory assets = ["USDC", "ETH", "WBTC"];
        for (uint256 i = 0; i < assets.length; i++) {
            uint256 balance = collateralBalances[user][assets[i]];
            uint256 price = priceOracle.getPrice(assets[i]);
            totalUSDValue += (balance * price) / (10**18);
        }
        return totalUSDValue;
    }
}
