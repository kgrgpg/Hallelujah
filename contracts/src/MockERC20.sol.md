Here is the Markdown documentation for your `MockERC20.sol` file.

---

# MockERC20.sol

## Overview
The `MockERC20` contract is a simple implementation of an ERC-20 token using OpenZeppelin's ERC-20 contract. It is primarily used for testing and simulation purposes, allowing you to create a token with a specified initial supply.

## Imports
```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```
- `ERC20.sol`: This import includes the implementation of the ERC-20 standard from OpenZeppelin, providing the necessary functionalities for a standard ERC-20 token.

## Contract Definition
```solidity
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}
```

## Constructor
### `constructor`
```solidity
constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
}
```
#### Description
- The constructor initializes the ERC-20 token with a given name, symbol, and initial supply.
- Inherits from OpenZeppelin's `ERC20` contract.

#### Parameters
- `name` (string memory): The name of the token (e.g., "Mock Token").
- `symbol` (string memory): The symbol of the token (e.g., "MOCK").
- `initialSupply` (uint256): The initial supply of the token, which will be minted to the deployer's address upon contract creation.

#### Actions
- Calls the `_mint` function from the `ERC20` contract to mint the initial supply of tokens to the deployer's address (`msg.sender`).

## Usage
This contract is useful for testing and development purposes where you need a simple ERC-20 token with a predefined initial supply. It can be used to simulate token transactions, test smart contract interactions involving ERC-20 tokens, or set up a test environment for decentralized applications.

## Example
To deploy this contract, you would provide the token's name, symbol, and initial supply:
```solidity
const MockERC20 = await ethers.getContractFactory("MockERC20");
const mockERC20 = await MockERC20.deploy("Mock Token", "MOCK", ethers.utils.parseUnits("1000000", 18));
await mockERC20.deployed();
```
In this example:
- `"Mock Token"` is the name of the token.
- `"MOCK"` is the symbol of the token.
- `1000000` (adjusted for decimals) is the initial supply of the token.

---

If you have any other files to document or any further questions, feel free to upload them, and I'll help you generate the corresponding markdown files!
