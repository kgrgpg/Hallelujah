// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/OrderBook.sol";

contract OrderBookTest is Test {
    OrderBook orderBook;

    function setUp() public {
        orderBook = new OrderBook();
    }

    function testPlaceOrder() public {
        uint256 orderId = orderBook.placeOrder("ETH", 1 ether, 3000, OrderBook.OrderType.Buy);
        (uint256 id, address user, uint256 amount, uint256 price, OrderBook.OrderType orderType,,) = orderBook.orders(orderId);

        assertEq(id, orderId);
        assertEq(user, address(this));
        assertEq(amount, 1 ether);
        assertEq(price, 3000);
        assertEq(uint(orderType), uint(OrderBook.OrderType.Buy));
    }

    function testCancelOrder() public {
        uint256 orderId = orderBook.placeOrder("ETH", 1 ether, 3000, OrderBook.OrderType.Buy);
        orderBook.cancelOrder(orderId);

        (, , , , , OrderBook.OrderStatus status,) = orderBook.orders(orderId);
        assertEq(uint(status), uint(OrderBook.OrderStatus.Cancelled));
    }

    function testMatchOrders() public {
        orderBook.placeOrder("ETH", 1 ether, 3000, OrderBook.OrderType.Buy);
        orderBook.placeOrder("ETH", 1 ether, 2900, OrderBook.OrderType.Sell);
        orderBook.matchOrders("ETH");

        OrderBook.Order[] memory orders = orderBook.getOrdersByAsset("ETH");
        assertEq(uint(orders[0].status), uint(OrderBook.OrderStatus.Filled));
        assertEq(uint(orders[1].status), uint(OrderBook.OrderStatus.Filled));
    }
}
