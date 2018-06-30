const defaultEnv = require('./env.json');

let TRANSMUTE_ENV = process.env.TRANSMUTE_ENV || 'infura';

// // always use infura in production
// if (typeof window !== 'undefined' && window.location.host === 'transmute-industries.github.io') {
//   TRANSMUTE_ENV = 'infura';
// }

// // always use localhost for dev
// if (typeof window !== 'undefined' && window.location.host === 'localhost') {
//   TRANSMUTE_ENV = 'localhost';
// }

let env = defaultEnv[TRANSMUTE_ENV];

console.log(env)

module.exports = env;
