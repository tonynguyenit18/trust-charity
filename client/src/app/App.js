import React, { Component } from "react";
import DonationContract from "../contracts/Donation.json";
import getWeb3 from "../utils/getWeb3";
import truffleContract from "truffle-contract";
import "../css/app.css";
import Header from "./Header";
import Projects from "./Projects";
import Admin from "./Admin";

import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicAddress: "",
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
      const publicAddress = await web3.eth.getCoinbase();
      const Contract = truffleContract(DonationContract, publicAddress);

      Contract.setProvider(web3.currentProvider);

      const instance = await Contract.deployed();

      window.ethereum.on('accountsChanged', this.handleMetaMaskAccountChanged)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          publicAddress,
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

    // get post data form database (ideally only posts with status 1)
    const fetchedPostData = await axios.get("http://localhost:8000/posts")
    const fetchedPosts = fetchedPostData.data

    const projects = [];
    for (var i = 0; i < postIdsArray.length; i++) {
      let completeObj = null
      const post = await contracts.donation.posts(postIdsArray[i].toNumber());
      const project = this.getProjectInfo(post);
      // find correspoding post by id
      const correspondingPostDatabase = fetchedPosts.find((p) => p._id === postIdsArray[i].toNumber())
      // conbine those two post(blockchain one and external database one)
      completeObj = Object.assign(project, correspondingPostDatabase)
      projects.push(completeObj)
    }
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

  handleMetaMaskAccountChanged = accounts => {
    if (accounts && accounts[0]) {
      this.setState({ publicAddress: accounts[0] })
    }
  }

  render() {
    // admin user is true for the debugging purposes
    const adminUser = false;


    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="app container-fluid">
          <Header web3={this.state.web3}></Header>
        {this.state.projects && this.state.projects.length > 0 ? (
          <Projects
            projects={this.state.projects}
            donationContract={this.state.contracts ? this.state.contracts.donation : null}
            web3={this.state.web3}
            publicAddress={this.state.publicAddress}
            reLoadPage={this.setupAccount}></Projects>
        ) : null}

      </div>
    );
  }
}

export default App;
