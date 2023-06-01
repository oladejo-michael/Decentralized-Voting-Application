// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public voteCounts;

    event VoteCasted(address indexed voter, uint256 indexed option);

    function castVote(uint256 option) public {
        require(!hasVoted[msg.sender], "Already voted");
        
        voteCounts[option] += 1;
        hasVoted[msg.sender] = true;
        
        emit VoteCasted(msg.sender, option);
    }

    function getVoteCount(uint256 option) public view returns (uint256) {
        return voteCounts[option];
    }
}
