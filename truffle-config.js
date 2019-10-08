const path = require("path");
require('dotenv').config();

var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = process.env.INFURA_API;
var mnemonic = process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + infura_apikey),
      network_id: 3
    }
  }
};
