// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CollateralManager {
    struct Collateral {
        address user;
        uint256 amount;
        string asset;
    }

    mapping(address => mapping(string => uint256)) public collateralBalances;

    event CollateralDeposited(address indexed user, string asset, uint256 amount);
    event CollateralWithdrawn(address indexed user, string asset, uint256 amount);

    function depositCollateral(string memory asset) public payable {
        collateralBalances[msg.sender][asset] += msg.value;
        emit CollateralDeposited(msg.sender, asset, msg.value);
    }

    function withdrawCollateral(string memory asset, uint256 amount) public {
        require(collateralBalances[msg.sender][asset] >= amount, "Insufficient balance");
        collateralBalances[msg.sender][asset] -= amount;
        payable(msg.sender).transfer(amount);
        emit CollateralWithdrawn(msg.sender, asset, amount);
    }

    function getCollateralBalance(address user, string memory asset) public view returns (uint256) {
        return collateralBalances[user][asset];
    }
}
