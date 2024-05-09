import { expect } from "chai";
import { ethers } from "hardhat";
import {
  CollateralManager,
  CollateralManager__factory,
  MockPriceOracle,
  MockPriceOracle__factory,
} from "../typechain";

describe("CollateralManager Contract", () => {
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

    // Set initial prices
    await priceOracle.setPrice("ETH", ethers.utils.parseEther("2000"));
    await priceOracle.setPrice("USDC", ethers.utils.parseEther("1"));
  });

  it("should deposit and fetch native collateral balances", async () => {
    const [owner] = await ethers.getSigners();

    await collateralManager.depositNativeCollateral("ETH", {
      value: ethers.utils.parseEther("1.0"),
    });
    const balance = await collateralManager.getCollateralBalance(owner.address, "ETH");
    expect(balance).to.equal(ethers.utils.parseEther("1.0"));
  });

  it("should withdraw native collateral and update balances", async () => {
    const [owner] = await ethers.getSigners();

    await collateralManager.depositNativeCollateral("ETH", {
      value: ethers.utils.parseEther("2.0"),
    });
    await collateralManager.withdrawNativeCollateral("ETH", ethers.utils.parseEther("1.0"));

    const balance = await collateralManager.getCollateralBalance(owner.address, "ETH");
    expect(balance).to.equal(ethers.utils.parseEther("1.0"));
  });

  it("should deposit and withdraw ERC20 collateral", async () => {
    const [owner, addr1] = await ethers.getSigners();

    // Mock USDC token
    const MockERC20Factory = await ethers.getContractFactory("MockERC20");
    const usdc = await MockERC20Factory.deploy("USD Coin", "USDC", ethers.utils.parseEther("10000"));
    await usdc.transfer(addr1.address, ethers.utils.parseEther("1000"));

    // Set ERC20 support in Collateral Manager
    await collateralManager.setSupportedERC20Asset("USDC", usdc.address);

    // Approve and deposit USDC
    await usdc.connect(addr1).approve(collateralManager.address, ethers.utils.parseEther("500"));
    await collateralManager.connect(addr1).depositERC20Collateral("USDC", ethers.utils.parseEther("500"));

    const balance = await collateralManager.getCollateralBalance(addr1.address, "USDC");
    expect(balance).to.equal(ethers.utils.parseEther("500"));

    // Withdraw USDC
    await collateralManager.connect(addr1).withdrawERC20Collateral("USDC", ethers.utils.parseEther("250"));
    const newBalance = await collateralManager.getCollateralBalance(addr1.address, "USDC");
    expect(newBalance).to.equal(ethers.utils.parseEther("250"));
  });

  it("should calculate the USD value of collateral correctly", async () => {
    const [owner] = await ethers.getSigners();

    await collateralManager.depositNativeCollateral("ETH", {
      value: ethers.utils.parseEther("1.0"),
    });

    const totalUSDValue = await collateralManager.getUSDValue(owner.address);
    expect(totalUSDValue).to.equal(ethers.utils.parseEther("2000"));
  });
});
