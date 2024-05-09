import { expect } from "chai";
import { ethers } from "hardhat";
import { OrderBook, OrderBook__factory } from "../typechain";

describe("OrderBook Contract", () => {
  let orderBook: OrderBook;

  beforeEach(async () => {
    const OrderBookFactory = (await ethers.getContractFactory(
      "OrderBook"
    )) as OrderBook__factory;
    orderBook = await OrderBookFactory.deploy();
    await orderBook.deployed();
  });

  it("should place and fetch buy and sell orders", async () => {
    await orderBook.placeOrder("BTC", 1, 50000, 0); // Buy
    await orderBook.placeOrder("BTC", 1, 60000, 1); // Sell

    const orders = await orderBook.getOrdersByAsset("BTC");
    expect(orders.length).to.equal(2);
    expect(orders[0].price).to.equal(50000);
    expect(orders[0].orderType).to.equal(0); // Buy
    expect(orders[1].price).to.equal(60000);
    expect(orders[1].orderType).to.equal(1); // Sell
  });

  it("should cancel an existing order", async () => {
    const buyOrderId = await orderBook.placeOrder("BTC", 1, 50000, 0); // Buy
    await orderBook.cancelOrder(buyOrderId);

    const orders = await orderBook.getOrdersByAsset("BTC");
    expect(orders[0].status).to.equal(2); // Cancelled
  });

  it("should match buy and sell orders correctly", async () => {
    await orderBook.placeOrder("BTC", 1, 50000, 0); // Buy
    await orderBook.placeOrder("BTC", 1, 50000, 1); // Sell
    await orderBook.matchOrders("BTC");

    const orders = await orderBook.getOrdersByAsset("BTC");
    expect(orders[0].status).to.equal(1); // Filled
    expect(orders[1].status).to.equal(1); // Filled
  });
});
