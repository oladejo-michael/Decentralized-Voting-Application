pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public hasVoted;  // Mapping to track whether an address has voted
    
    address public owner;  // Address of the contract owner
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }
    
    constructor() {
        owner = msg.sender;  // Set the contract owner as the deployer
    }

    function vote(uint option) public {
        require(!hasVoted[msg.sender], "You have already voted.");  // Check if the user has already voted
        
        // Perform the voting logic
        
        hasVoted[msg.sender] = true;  // Mark the user as voted
    }
    
    function resetVotes() public onlyOwner {
        for (uint i = 0; i < voters.length; i++) {
            hasVoted[voters[i]] = false;  // Reset the voted status for all users
        }
    }
}
