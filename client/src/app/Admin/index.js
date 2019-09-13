import React from "react";
import axios from 'axios'
import Post from './Post'
import AmdminCheckModal from './AdminCheckPostModal'


class Admin extends React.Component {
  state = {
    charityPosts: null,
    selectedPost: null,
    modalShow: false
  }

  handleModalClose = () => this.setState({ modalShow: false })
  handleModalShow = () => this.setState({ modalShow: true })

  removePostById = (targetPostId) => {
    this.setState(prevState => {
      // remove a post by passed id
      const updatedPosts = prevState.charityPosts.filter(post => {
        if (post._id !== targetPostId) {
          return post;
        }
      });
      return {
        charityPosts: updatedPosts
      };
    });
  }

  componentDidMount = () => {
    const newPostGetUrl = 'http://localhost:8000/new_posts'
    // get new posts(status:0) and set them to state
    axios.get(newPostGetUrl).then((res) => {
      this.setState({ charityPosts: res.data })
    }).catch((e) => {
      console.log(e)
    })

  }

  render() {
    return (
      <div className='container-fluid'>

        <AmdminCheckModal
          account={this.props.account}
          donationContract={this.props.donationContract}
          modalShow={this.state.modalShow}
          handleModalClose={this.handleModalClose}
          postObj={this.state.selectedPost}
          removePostById={this.removePostById}
        />
        {/* title section */}
        <div className="row justify-content-center">
          <div className="col-4 mt-5 text-center">
            <h2 className='mb-3' style={{ fontSize: "24px", color: "#14BDEB" }}>Admin section</h2>
          </div>
        </div>

        {/* posts section */}
        <div className="project-container row">
          {this.state.charityPosts && this.state.charityPosts.map((post, index) => {
            return (
              <div key={`post-${index}-${post._id}`} className="col-3 mb-4">
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    this.setState({ selectedPost: post, modalShow: true })
                  }}>
                  <Post
                    postObj={post}
                  />
                </a>
              </div>
            )
          }
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
