require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    /*ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "", //Infura url with projectId
      accounts: 
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [], // add the account that will deploy the contract (private key)
     }*/
     rinkeby: {
      url:'https://rinkeby.infura.io/v3/2acaba50541f45ef95a3875e02019bb5',
      accounts: [`cebc4a5525b871bf664582f72139f06097a388493ae3c09fbc456b0a1966e335`],
      gas: 2100000,
      gasPrice: 8000000000,
     }

  },
  /*gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }*/

};
