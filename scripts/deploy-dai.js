// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  //const TokenA = await hre.ethers.getContractFactory("TokenA");
  //const tokenA = await TokenA.deploy();
  //await tokenA.deployed();
  //console.log("TokenA:", tokenA.address);

  // We get the contract to deploy
  const Swap = await hre.ethers.getContractFactory("Swap2");
  const swap = await Swap.deploy("0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea");
  await swap.deployed();

  console.log("Swap:", swap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
