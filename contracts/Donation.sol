pragma solidity ^0.5.0;

contract Donation {
    //Model a Candidate
    struct Post{
        uint id; // uniqe id for each post(comes from external database)
        uint upVote; // upvote count
        uint downVote; // downvote count
        uint256 goalAmount; // goal donation amount(when the money rearches the amount, send the money to destination)
        uint256 donationTotalAmount; // total donation amount in wei (1 ether is 1000000000000000000)
        address destinationAddress;  // address that this contract sends the money to
        mapping(address => int) voters; // each user vote status
        mapping(address => uint256) donations; // each user donation amount
    }

    // voters status -1: downvote,
    //                0: no vote
    //                1: upvote

    //posts key value pair.(the key is post's id)
    mapping(uint => Post) public posts;

    // store post ids as array for looping through
    uint[] public postIdsArray;

    // Store Post Count
    uint public postCount;

    // constructor
    constructor() public{
        addPost(98, 5);
        addPost(99, 5);
    }

    // funciton returns how much more to reach the goal
    function howMuchMoreToGoal(uint _postId) public view returns(uint256){
     return posts[_postId].goalAmount - posts[_postId].donationTotalAmount;
    }

    // return postIds array
    function getPostIds() public view returns(uint[] memory){
        return postIdsArray;
    }

    // function to add a new post with id parameter
    function addPost (uint _id, uint _goal) public {
        require(_id > 0, "Invalid post");
        // increment post count
        postCount ++;
        // set the post id in postIds array
        postIdsArray.push(_id);
        // convert Ether to Wei
        uint256  weiGoal = _goal * 1000000000000000000;

        // set default values (5 ether is set as a goal amount and destination is current user (they are only for dubug))
        posts[_id] = Post(_id, 0, 0, weiGoal, 0, msg.sender);
    }

    function donate (uint _postId) public payable{
        // check if valid post
        require(_postId > 0, "Invalid Post");
        // donation amount has to be positive value
        require(msg.value > 0, "Invalid Amount");

        if( posts[_postId].voters[msg.sender] == -1){
            // if the user has done downVote, toggle the vote status
            posts[_postId].downVote--;
            posts[_postId].upVote++;

            // set the user as upvoter
            posts[_postId].voters[msg.sender] = 1;
        }else{
            if(posts[_postId].voters[msg.sender] == 0)
            {
                // if the user has never voted, set the user as upvoter
                posts[_postId].upVote++;
            }
            // set user as upvoter
            posts[_postId].voters[msg.sender] = 1;
        }

        // add amount to total
        posts[_postId].donationTotalAmount += msg.value;
        // add amount to individual donation amount
        posts[_postId].donations[msg.sender] += msg.value;

        // when donation amount reaches the goal, send money out
        if(posts[_postId].donationTotalAmount >= posts[_postId].goalAmount){
           transferDonationToDestination(posts[_postId].destinationAddress);
        }

    }

    function downVote (uint _postId) public {
        require(_postId > 0, "Invalid Post");
        require(posts[_postId].voters[msg.sender] != -1, "You are not able to downVote twice");

        if( posts[_postId].voters[msg.sender] == 1){
            // if user was upvoter then toggle the vote status
            posts[_postId].upVote--;
            posts[_postId].donationTotalAmount -= posts[_postId].donations[msg.sender];

            //Refund action
            // return the money that the user donated
            msg.sender.transfer(posts[_postId].donations[msg.sender]);
            // set 0 to the individual donation amount
            posts[_postId].donations[msg.sender] = 0;
        }

        posts[_postId].downVote++;

        // set the user as down voter
        posts[_postId].voters[msg.sender] = -1;
    }

    function transferDonationToDestination(address _destination) private{
        // set the money to destination
    }
}