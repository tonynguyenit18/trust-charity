import React, { Component } from "react";
import DonationContract from "../../contracts/Donation.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";
import { AppContext } from "../App"

import Header from "../Header";
import Projects from "../Projects";
import axios from 'axios'


import "../../css/app.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
      web3: null,
      contracts: {
        donation: null
      },
      projects: null,
      user: null
    };
  }

  componentDidMount = async () => {
    const user = this.props.location && this.props.location.state ? this.props.location.state.user : null
    if (user) {
      this.props.history.replace();
      window.location.reload()
    }
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const account = await web3.eth.getCoinbase();
      const Contract = truffleContract(DonationContract, account);

      Contract.setProvider(web3.currentProvider);

      const instance = await Contract.deployed();

      window.ethereum.on('accountsChanged', this.handleMetaMaskAccountChanged)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          account,
          contracts: { ...this.state.contracts, donation: instance },
          user
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
      this.setState({ account: accounts[0] })
    }
  }

  render() {
    // admin user is true for the debugging purposes
    const adminUser = false;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <AppContext.Consumer>
        {context => (
          <div className="app container-fluid">
            <Header></Header>
            {this.state.projects && this.state.projects.length > 0 ? (
              <Projects
                projects={this.state.projects}
                donationContract={this.state.contracts ? this.state.contracts.donation : null}
                web3={this.state.web3}
                account={this.state.account}
                reLoadPage={this.setupAccount}></Projects>
            ) : null}
            {this.state.account || (this.state.user && this.state.user.address) ?
              <div style={{ width: "100vw", position: "fixed", bottom: 0, height: "40px", backgroundColor: "#fff", textAlign: "center" }}>
                <p style={{ marginTop: "10px" }}>Address: {this.state.account ? this.state.account : this.user.address}</p>
              </div> : null}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Home;
