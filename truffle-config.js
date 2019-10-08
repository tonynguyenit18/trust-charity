const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "a5730bd983fb4785b9bab40045b80866";
var mnemonic = "coral thunder dash quote word usual permit lazy laptop erase sting lady";

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
