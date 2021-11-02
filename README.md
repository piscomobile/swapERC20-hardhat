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


npx hardhat run scripts/sample-script.js --network rinkeby
npx hardhat run scripts/deploy-tether.js --network rinkeby

token tether 
https://rinkeby.etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7
Code
https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code
address 0xdac17f958d2ee523a2206206994597c13d831ec7


deploy 
TokenA: 0x10392ff3ab619dd1328005EC9AD72FEc819D0b05
Swap: 0x12840CCB4143E10D3B7a17cf15e3b1f4ccE8e470
----------------------------------------------------

const Swap = await hre.ethers.getContractFactory("Token");
const swap = await Swap.attach("0x264B925A69e4A0B7bd4B639c27457988D72c1fD0");
await swap.getBalance()
const token = await Swap.attach("0x13204c89a0532901a1be618ce589cca399851a5f");
0xa1cba00d6e99f52b8cb5f867a6f2db0f3ad62276
https://bybit-exchange.github.io/erc20-faucet/

const swap = await Swap.attach("0xe57173C842D50388CE7A42862B72C089b8465c5E");
const swap = await Swap.attach("0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea");
---------------------------
problems
https://ethereum.stackexchange.com/questions/64517/how-to-transfer-and-transferfrom-on-the-tether-smart-contract-from-another-smart


------------------------------------------------------------------

const Swap = await hre.ethers.getContractFactory("Swap2");
const swap = await Swap.attach("0x91876E65D3cF64daF489729e4d9469a5c9864E6A");
let balance = await swap.getBalance("0x5fa7b8eb58c43561f34f8a9113A73DEc12117988")
balance.toNumber()

--------------------------------------------------------------------

dai address rinkeby
https://rinkeby.etherscan.io/token/0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea


Proposal Test Cases
TokenA: 0xe8D2A1E88c91DCd5433208d4152Cc4F399a7e91d
TokenB: 0x18E317A7D70d8fBf8e6E893616b52390EbBdb629
Swap: 0xCace1b78160AE76398F486c8a18044da0d66d86D
Los addr1 y addr2 permitireon que el swap disponga 10
10
10
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Balances de addr1 en TokenA y TokenB
6
1
Balances de addr2 en TokenA y TokenB
4
9