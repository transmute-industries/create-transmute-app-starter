const defaultEnv = require('./env.json');

const TRANSMUTE_ENV = process.env.TRANSMUTE_ENV || 'infura';

let env = defaultEnv[TRANSMUTE_ENV];

module.exports = env;
