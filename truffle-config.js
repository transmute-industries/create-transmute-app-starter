require('dotenv').config();
const Web3 = require('web3');
var HDWalletProvider = require('truffle-hdwallet-provider');
const transmuteConfig = require('./src/transmute-config');

module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      provider: new Web3.providers.HttpProvider(
        transmuteConfig.web3Config.providerUrl
      ),
      network_id: '*' // Match any network id
    },
    // Providers using HDWallet need to be wrapped in a function: https://truffleframework.com/docs/advanced/configuration#providers
    ropsten: {
      provider: function() {
        let wallet = new HDWalletProvider(
          process.env.REACT_APP_ROPSTEN_MNEMONIC,
          `https://ropsten.infura.io/${process.env.REACT_APP_INFURA_API_TOKEN}`
        );
        // useful for being sure what your deploy address is and funding it.
        // let deployAddress = wallet.addresses[0];
        // console.log(deployAddress);
        return wallet;
      },
      network_id: 3
    }
  }
};
