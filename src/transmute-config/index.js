const defaultEnv = require('./env.json');

const TRANSMUTE_ENV = process.env.TRANSMUTE_ENV || 'localhost';

let env = defaultEnv[TRANSMUTE_ENV];


// If you want to set custom headers for IPFS
// const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
// env.ipfsConfig = {
//   ...env.ipfsConfig,
//   authorization: 'Bearer ' + ACCESS_TOKEN
// };

module.exports = env;
