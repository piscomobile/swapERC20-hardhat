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
  [owner, addr1, addr2 ,addr3] = await ethers.getSigners();
  const TokenA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await TokenA.deploy();
  await tokenA.deployed();
  await tokenA.mint(addr1.address,10);
  console.log("TokenA:", tokenA.address);

  const TokenB = await hre.ethers.getContractFactory("TokenB");
  const tokenB = await TokenB.deploy();
  await tokenB.deployed();
  await tokenB.mint(addr2.address,10);
  console.log("TokenB:", tokenB.address);

  // We get the contract to deploy
  const Swap = await hre.ethers.getContractFactory("Swapper");
  const swap = await Swap.deploy(tokenA.address , addr1.address , 2 ,tokenB.address , addr2.address , 3  );
  await swap.deployed();
  console.log("Swap:", swap.address);
  await tokenA.connect(addr1).approve(swap.address , 2);
  await tokenB.connect(addr2).approve(swap.address , 3);
  await swap.swap()


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
