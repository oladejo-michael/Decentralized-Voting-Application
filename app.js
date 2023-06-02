window.addEventListener('load', async () => {
    // Check if Web3 is available
    if (typeof web3 !== 'undefined') {
      // Use the injected provider
      web3 = new Web3(web3.currentProvider);
    } else {
      // Set up a local provider
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  
    // Load the smart contract
    const contractAddress = 'CONTRACT_ADDRESS';
    const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);
  
    // Retrieve and display the vote counts
    const option1Count = await contract.methods.getVoteCount(1).call();
    const option2Count = await contract.methods.getVoteCount(2).call();
    const option3Count = await contract.methods.getVoteCount(3).call();
    document.getElementById('option1Count').textContent = option1Count;
    document.getElementById('option2Count').textContent = option2Count;
    document.getElementById('option3Count').textContent = option3Count;
  });
  
  async function castVote() {
    // Check if the user has a connected wallet
    if (!web3.currentProvider.selectedAddress) {
      alert('Please connect your wallet to cast a vote.');
      return;
    }
  
    const selectedOption = document.getElementById('voteOption').value;
    
    try {
      // Load the smart contract
      const contractAddress = 'CONTRACT_ADDRESS';
      const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);
    
    // Check if the user is authorized to vote
    const isAuthorized = await contract.methods.isAuthorized(web3.currentProvider.selectedAddress).call();
    if (!isAuthorized) {
      alert('You are not authorized to vote.');
      return;
    }

    // Check if the user has already voted
    const hasVoted = await contract.methods.hasVoted(web3.currentProvider.selectedAddress).call();
    if (hasVoted) {
      alert('You have already voted.');
      return;
    }    
      
      // Cast the vote
      await contract.methods.castVote(selectedOption).send({ from: web3.currentProvider.selectedAddress });
    
      // Update the vote counts
      const option1Count = await contract.methods.getVoteCount(1).call();
      const option2Count = await contract.methods.getVoteCount(2).call();
      const option3Count = await contract.methods.getVoteCount(3).call();
      document.getElementById('option1Count').textContent = option1Count;
      document.getElementById('option2Count').textContent = option2Count;
      document.getElementById('option3Count').textContent = option3Count;
    
      alert('Vote casted successfully!');
    } catch (error) {
      console.error('Error while casting vote:', error);
      alert('Failed to cast vote. Please try again.');
    }
  }
  
