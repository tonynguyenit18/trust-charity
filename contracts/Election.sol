pragma solidity ^0.5.0;

contract Election {
    //Model a Candidate
    struct Post{
        uint id;
        uint upVote;
        uint downVote;
        uint donationAmount;
        mapping(address => int) voters;
    }

    //Fetch Candidate
    mapping(uint => Post) public posts;

    // Store Candidate Count
    uint public postCount;

    // event votedEvent(uint indexed_candidateId);

    constructor() public{
        addPost(1);
        addPost(2);
    }

    function addPost (uint _id) private {
        require(_id > 0, "Invalid post");
        postCount ++;
        posts[_id] = Post(_id, 0, 0,0);
    }

    function donate (uint _postId, uint _amount) public {
        // check if valid candidate
        require(_postId > 0, "Invalid Post");

        require(_amount > 0, "Invalid Amount");

        if( posts[_postId].voters[msg.sender] == -1){
            posts[_postId].downVote--;
            posts[_postId].upVote++;
            posts[_postId].voters[msg.sender] += int(_amount) + 1;
        }else{
            if(posts[_postId].voters[msg.sender] == 0)
            {
                posts[_postId].upVote++;
            }
            posts[_postId].voters[msg.sender] += int(_amount);
        }
        // record that voter has voted
        posts[_postId].donationAmount += _amount;
        // update candidate vote count
    }

    function downVote (uint _postId) public {
        require(_postId > 0, "Invalid Post");

        require(posts[_postId].voters[msg.sender] >= 0, "You are not able to downVote twice");

        if( posts[_postId].voters[msg.sender] > 0){
            posts[_postId].upVote--;
            posts[_postId].donationAmount -= uint(posts[_postId].voters[msg.sender]);
            //Todo: Add refund function
        }
        posts[_postId].downVote++;
        posts[_postId].voters[msg.sender] = -1;
    }
}