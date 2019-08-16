import React, { Component } from "react";
import DonationContract from "../contracts/Donation.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract"

import Header from "./Header"

import "../css/app.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
      web3: null,
      contracts: {
        donation: null
      }

    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const account = await web3.eth.getCoinbase();


      const Contract = truffleContract(DonationContract, account);

      Contract.setProvider(web3.currentProvider);

      const instance = await Contract.deployed();
      console.log(instance.address)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account, contracts: { ...this.state.contracts, donation: instance } });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  setupAccount = async () => {
    const { contracts } = this.state;
    console.log(contracts.donation)

    await contracts.donation.downVote(1, { from: this.state.account });
    const post1 = await contracts.donation.posts(1);
    console.log(post1)
    // Stores a given value, 5 by default.


  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="app container-fluid">
        <Header></Header>
      </div>
    );
  }
}

export default App;
