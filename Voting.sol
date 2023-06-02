pragma solidity ^0.8.0;

contract Voting {
  mapping(uint => uint) public voteCounts;
  mapping(address => bool) public hasVoted;
  mapping(address => bool) public isAuthorized;

  event VoteCasted(uint option);

  constructor() {
    isAuthorized[msg.sender] = true; // Set the contract deployer as authorized by default
  }

  modifier onlyAuthorized() {
    require(isAuthorized[msg.sender], "You are not authorized to vote.");
    _;
  }

  function authorize(address voter) public onlyAuthorized {
    isAuthorized[voter] = true;
  }

  function revokeAuthorization(address voter) public onlyAuthorized {
    isAuthorized[voter] = false;
  }

  function castVote(uint option) public onlyAuthorized {
    require(!hasVoted[msg.sender], "You have already voted.");

    // Update the vote count
    voteCounts[option]++;

    // Mark the user as voted
    hasVoted[msg.sender] = true;

    emit VoteCasted(option);
  }

  function getVoteCount(uint option) public view returns (uint) {
    return voteCounts[option];
  }
}
