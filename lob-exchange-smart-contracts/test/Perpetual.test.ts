import { expect } from "chai";
import { ethers } from "hardhat";
import {
  Perpetual,
  Perpetual__factory,
  CollateralManager,
  CollateralManager__factory,
  MockPriceOracle,
  MockPriceOracle__factory,
} from "../typechain";

describe("Perpetual Contract", () => {
  let perpetual: Perpetual;
  let collateralManager: CollateralManager;
  let priceOracle: MockPriceOracle;

  beforeEach(async () => {
    const MockPriceOracleFactory = (await ethers.getContractFactory(
      "MockPriceOracle"
    )) as MockPriceOracle__factory;
    priceOracle = await MockPriceOracleFactory.deploy();
    await priceOracle.deployed();

    const CollateralManagerFactory = (await ethers.getContractFactory(
      "CollateralManager"
    )) as CollateralManager__factory;
    collateralManager = await CollateralManagerFactory.deploy(priceOracle.address);
    await collateralManager.deployed();

    const PerpetualFactory = (await ethers.getContractFactory(
      "Perpetual"
    )) as Perpetual__factory;
    perpetual = await PerpetualFactory.deploy(collateralManager.address, priceOracle.address);
    await perpetual.deployed();

    // Set initial prices
    await priceOracle.setPrice("ETH", ethers.utils.parseEther("2000"));
    await priceOracle.setPrice("BTC", ethers.utils.parseEther("50000"));

    // Deposit initial collateral
    await collateralManager.depositNativeCollateral("ETH", {
      value: ethers.utils.parseEther("5.0"),
    });
  });

  it("should open and close long positions correctly", async () => {
    await perpetual.openPosition(true, "ETH", ethers.utils.parseEther("1.0"), 2);

    const position = await perpetual.getPosition(await ethers.getSigners()[0].address);
    expect(position.amount).to.equal(ethers.utils.parseEther("1.0"));
    expect(position.isLong).to.be.true;

    await perpetual.closePosition(2200);

    const newPosition = await perpetual.getPosition(await ethers.getSigners()[0].address);
    expect(newPosition.amount).to.equal(0);
  });

  it("should open and close short positions correctly", async () => {
    await perpetual.openPosition(false, "ETH", ethers.utils.parseEther("1.0"), 2);

    const position = await perpetual.getPosition(await ethers.getSigners()[0].address);
    expect(position.amount).to.equal(ethers.utils.parseEther("1.0"));
    expect(position.isLong).to.be.false;

    await perpetual.closePosition(1800);

    const newPosition = await perpetual.getPosition(await ethers.getSigners()[0].address);
    expect(newPosition.amount).to.equal(0);
  });

  it("should adjust the funding rate correctly", async () => {
    await perpetual.openPosition(true, "ETH", ethers.utils.parseEther("1.0"), 2);
    await perpetual.openPosition(false, "ETH", ethers.utils.parseEther("1.0"), 2);

    const fundingRateLong = await perpetual.calculateFundingRate(true);
    const fundingRateShort = await perpetual.calculateFundingRate(false);

    expect(fundingRateLong).to.equal(0);
    expect(fundingRateShort).to.equal(0);
  });
});
