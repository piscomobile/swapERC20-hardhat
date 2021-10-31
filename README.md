# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# swapERC20-hardhat


deploy 
TokenA: 0x10392ff3ab619dd1328005EC9AD72FEc819D0b05
Swap: 0x12840CCB4143E10D3B7a17cf15e3b1f4ccE8e470
----------------------------------------------------

const Token = await hre.ethers.getContractFactory("Token");
const swap = await Swap.attach("0x264B925A69e4A0B7bd4B639c27457988D72c1fD0");
await swap.getBalance()
const token = await Swap.attach("0x13204c89a0532901a1be618ce589cca399851a5f");
0xa1cba00d6e99f52b8cb5f867a6f2db0f3ad62276
https://bybit-exchange.github.io/erc20-faucet/
