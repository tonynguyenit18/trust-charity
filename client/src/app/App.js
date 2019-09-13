import React, { Component } from "react";
import DonationContract from "../contracts/Donation.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";

import Header from "./Header";
import Projects from "./Projects";
import Admin from "./Admin";


import "../css/app.css";

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
      },
      projects: null
    };
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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          account,
          contracts: { ...this.state.contracts, donation: instance }
        },
        this.setupAccount
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  setupAccount = async () => {
    const { contracts } = this.state;
    let postIdsArray = await contracts.donation.getPostIds();

    const projects = [];

    for (var i = 0; i < postIdsArray.length; i++) {
      const post = await contracts.donation.posts(postIdsArray[i].toNumber());
      const project = this.getProjectInfo(post);
      projects.push(project);
    }

    console.log(projects)
    this.setState({ projects });
  };

  getProjectInfo = post => {
    const projectId = post.id.toNumber();
    const upVote = post.upVote.toNumber();
    const downVote = post.downVote.toNumber();
    const donationTotalAmount = this.state.web3.utils.fromWei(post.donationTotalAmount, "ether");
    const goalAmount = this.state.web3.utils.fromWei(post.goalAmount, "ether");
    return { projectId, upVote, downVote, donationTotalAmount, goalAmount };
  };

  render() {
    // admin user is true for the debugging purposes
    const adminUser = false;


    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="app container-fluid">
        <Header></Header>
        {this.state.projects && this.state.projects.length > 0 ? (
          <Projects
            projects={this.state.projects}
            donationContract={this.state.contracts ? this.state.contracts.donation : null}
            web3={this.state.web3}
            account={this.state.account}></Projects>
        ) : null}

      </div>
    );
  }
}

export default App;
