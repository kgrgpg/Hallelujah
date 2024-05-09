import { expect } from "chai";
import { ethers } from "hardhat";
import {
  Liquidation,
  Liquidation__factory,
  Perpetual,
  Perpetual__factory,
  CollateralManager,
  CollateralManager__factory,
  MockPriceOracle,
  MockPriceOracle__factory,
} from "../typechain";

describe("Liquidation Contract", () => {
  let liquidation: Liquidation;
  let perpetual: Perpetual;
  let collateralManager: CollateralManager;
  let priceOracle: MockPriceOracle;

  beforeEach(async () => {
    // Deploy MockPriceOracle
    const MockPriceOracleFactory = (await ethers.getContractFactory(
      "MockPriceOracle"
    )) as MockPriceOracle__factory;
    priceOracle = await MockPriceOracleFactory.deploy();
    await priceOracle.deployed();

    // Deploy CollateralManager
    const CollateralManagerFactory = (await ethers.getContractFactory(
      "CollateralManager"
    )) as CollateralManager__factory;
    collateralManager = await CollateralManagerFactory.deploy(priceOracle.address);
    await collateralManager.deployed();

    // Deploy Perpetual
    const PerpetualFactory = (await ethers.getContractFactory(
      "Perpetual"
    )) as Perpetual__factory;
    perpetual = await PerpetualFactory.deploy(collateralManager.address, priceOracle.address);
    await perpetual.deployed();

    // Deploy Liquidation
    const LiquidationFactory = (await ethers.getContractFactory(
      "Liquidation"
    )) as Liquidation__factory;
    liquidation = await LiquidationFactory.deploy(perpetual.address);
    await liquidation.deployed();

    // Set initial prices
    await priceOracle.setPrice("ETH", ethers.utils.parseEther("2000"));
    await priceOracle.setPrice("BTC", ethers.utils.parseEther("50000"));

    // Deposit initial collateral
    await collateralManager.depositNativeCollateral("ETH", {
      value: ethers.utils.parseEther("5.0"),
    });
  });

  it("should liquidate an under-collateralized long position", async () => {
    const [owner] = await ethers.getSigners();
    await perpetual.openPosition(true, "ETH", ethers.utils.parseEther("1.0"), 2);

    // Set a lower price to trigger liquidation
    await priceOracle.setPrice("ETH", ethers.utils.parseEther("1500"));

    await liquidation.liquidatePosition(owner.address, ethers.utils.parseEther("1500"));
    const position = await perpetual.getPosition(owner.address);
    expect(position.amount).to.equal(0); // Position should be liquidated
  });

  it("should liquidate an under-collateralized short position", async () => {
    const [owner] = await ethers.getSigners();
    await perpetual.openPosition(false, "ETH", ethers.utils.parseEther("1.0"), 2);

    // Set a higher price to trigger liquidation
    await priceOracle.setPrice("ETH", ethers.utils.parseEther("2500"));

    await liquidation.liquidatePosition(owner.address, ethers.utils.parseEther("2500"));
    const position = await perpetual.getPosition(owner.address);
    expect(position.amount).to.equal(0); // Position should be liquidated
  });

  it("should not liquidate a position that is sufficiently collateralized", async () => {
    const [owner] = await ethers.getSigners();
    await perpetual.openPosition(true, "ETH", ethers.utils.parseEther("1.0"), 2);

    // Keep price above liquidation price
    await priceOracle.setPrice("ETH", ethers.utils.parseEther("1800"));

    await expect(
      liquidation.liquidatePosition(owner.address, ethers.utils.parseEther("1800"))
    ).to.be.revertedWith("Position is not under-collateralized");
  });
});
