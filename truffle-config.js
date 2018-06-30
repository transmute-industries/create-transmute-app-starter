require('dotenv').config();
const Web3 = require('web3');
var HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      provider: new Web3.providers.HttpProvider('http://localhost:8545'),
      network_id: '*' // Match any network id
    },
    // Providers using HDWallet need to be wrapped in a function: https://truffleframework.com/docs/advanced/configuration#providers
    rinkeby: {
      provider: function() {
        let wallet = new HDWalletProvider(
          process.env.WALLET_MNEMONIC,
          `https://rinkeby.infura.io/${process.env.INFURA_API_TOKEN}`
        );
        // useful for being sure what your deploy address is and funding it.
        // let deployAddress = wallet.addresses[0];
        // console.log(deployAddress);
        return wallet;
      },
      network_id: 4
    }
  }
};
