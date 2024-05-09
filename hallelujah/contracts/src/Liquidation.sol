// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Perpetual.sol";

contract Liquidation {
    Perpetual private perpetual;

    event PositionLiquidated(address indexed user, uint256 amount, uint256 liquidationPrice);

    constructor(address _perpetualAddress) {
        perpetual = Perpetual(_perpetualAddress);
    }

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
}
