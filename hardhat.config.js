require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


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
     },
     matic: {
      url:`https://rpc-mumbai.maticvigil.com`,
      accounts: [`cebc4a5525b871bf664582f72139f06097a388493ae3c09fbc456b0a1966e335`,`239b440123b50939ddff1d07c60e96a8685e0d07e4a36a3874be535c9afb3cc3`,`744f9432f5d66902f491397352acd270e2a0768a9921b036be427f438a7976b1`,`bbd9486ed13cfac4edb58637b9f45a022b902d83df8a9994efb4a85ae4091768`],
      saveDeployments: true,
    },
  /*gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },*/
  },

  etherscan: {
    apiKey: "ZZSVR2YHJFTQISPJ3AS4UEVNYU6NA94CUV",
  },
}
