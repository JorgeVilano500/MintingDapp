// require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle');
const dotenv = require('dotenv');
const { task } = require('hardhat/config');
dotenv.config();
require('@nomiclabs/hardhat-etherscan');



task('accounts', 'Prints list of acocunts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
})




/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.REACT_APP_RINKEBY_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  }, 
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY
  }
};
