const bip39 = require('bip39');
const HDWalletProvider = require('truffle-hdwallet-provider');

require('dotenv').config();

// Use this code to generate a mneumonic and save it to your .env
// const mnemonic = bip39.generateMnemonic();
// console.log(mnemonic);


// Use this code to see your deployment address used by your .env
let wallet = new HDWalletProvider(
  process.env.WALLET_MNEMONIC,
  `https://rinkeby.infura.io/${process.env.INFURA_API_TOKEN}`
);

let deployAddress = wallet.addresses[0];
console.log('deployAddress: ', deployAddress);
