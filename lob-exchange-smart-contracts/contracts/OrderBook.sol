// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract OrderBook {
    enum OrderType { Buy, Sell }
    enum OrderStatus { Open, Filled, Cancelled }

    struct Order {
        uint256 id;
        address user;
        uint256 amount;
        uint256 price;
        OrderType orderType;
        OrderStatus status;
        uint256 timestamp;
    }

    uint256 public nextOrderId;
    mapping(uint256 => Order) public orders;
    mapping(string => uint256[]) public buyOrders; // asset => order ids
    mapping(string => uint256[]) public sellOrders;

    event OrderPlaced(uint256 id, address user, uint256 amount, uint256 price, OrderType orderType);
    event OrderCancelled(uint256 id);
    event OrderFilled(uint256 id);

    function placeOrder(string memory asset, uint256 amount, uint256 price, OrderType orderType) public returns (uint256) {
        uint256 orderId = nextOrderId++;
        orders[orderId] = Order({
            id: orderId,
            user: msg.sender,
            amount: amount,
            price: price,
            orderType: orderType,
            status: OrderStatus.Open,
            timestamp: block.timestamp
        });

        if (orderType == OrderType.Buy) {
            buyOrders[asset].push(orderId);
        } else {
            sellOrders[asset].push(orderId);
        }

        emit OrderPlaced(orderId, msg.sender, amount, price, orderType);
        return orderId;
    }

    function cancelOrder(uint256 id) public {
        Order storage order = orders[id];
        require(order.user == msg.sender, "Not your order");
        require(order.status == OrderStatus.Open, "Cannot cancel");
        order.status = OrderStatus.Cancelled;
        emit OrderCancelled(id);
    }

    function fillOrder(uint256 id, uint256 amount) internal {
        Order storage order = orders[id];
        require(order.status == OrderStatus.Open, "Order not open");
        require(order.amount >= amount, "Insufficient order amount");

        order.amount -= amount;
        if (order.amount == 0) {
            order.status = OrderStatus.Filled;
        }

        emit OrderFilled(id);
    }

    function matchOrders(string memory asset) public {
        uint256[] storage buy = buyOrders[asset];
        uint256[] storage sell = sellOrders[asset];
        uint256 buyIndex = 0;
        uint256 sellIndex = 0;

        while (buyIndex < buy.length && sellIndex < sell.length) {
            Order storage buyOrder = orders[buy[buyIndex]];
            Order storage sellOrder = orders[sell[sellIndex]];

            if (buyOrder.price >= sellOrder.price) {
                uint256 matchedAmount = buyOrder.amount < sellOrder.amount ? buyOrder.amount : sellOrder.amount;
                fillOrder(buyOrder.id, matchedAmount);
                fillOrder(sellOrder.id, matchedAmount);

                if (buyOrder.status == OrderStatus.Filled) {
                    buyIndex++;
                }
                if (sellOrder.status == OrderStatus.Filled) {
                    sellIndex++;
                }
            } else {
                break;
            }
        }

        buyOrders[asset] = sliceOrdersList(buy, buyIndex);
        sellOrders[asset] = sliceOrdersList(sell, sellIndex);
    }

    function sliceOrdersList(uint256[] memory orderList, uint256 index) private pure returns (uint256[] memory) {
        uint256[] memory newOrders = new uint256[](orderList.length - index);
        for (uint256 i = index; i < orderList.length; i++) {
            newOrders[i - index] = orderList[i];
        }
        return newOrders;
    }

    function getOrdersByAsset(string memory asset) public view returns (Order[] memory) {
        uint256[] storage buy = buyOrders[asset];
        uint256[] storage sell = sellOrders[asset];
        Order[] memory allOrders = new Order[](buy.length + sell.length);

        for (uint256 i = 0; i < buy.length; i++) {
            allOrders[i] = orders[buy[i]];
        }
        for (uint256 i = 0; i < sell.length; i++) {
            allOrders[buy.length + i] = orders[sell[i]];
        }

        return allOrders;
    }
}
