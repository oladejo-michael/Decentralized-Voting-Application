import Web3 from 'web3';

let contract;

window.addEventListener('load', async () => {
  // Check if Web3 is available
  if (typeof window.ethereum !== 'undefined') {
    // Use the MetaMask provider
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (typeof window.web3 !== 'undefined') {
    // Use the legacy Mist/old MetaMask provider
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    // Fallback to a local development provider
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  // Load the smart contract
  const response = await fetch('build/contracts/Voting.json');
  const { networks, abi } = await response.json();
  const networkId = Object.keys(networks)[0];
  const deployedNetwork = networks[networkId];
  const contractAddress = deployedNetwork.address;
  contract = new web3.eth.Contract(abi, contractAddress);

  // Retrieve and display the vote counts
  await updateVoteCounts();

  // Subscribe to the VoteCasted event
  contract.events.VoteCasted({}, async (error, event) => {
    if (error) {
      console.error('Error while listening to VoteCasted event:', error);
      return;
    }

    // Update the vote counts
    await updateVoteCounts();
  });
});

async function updateVoteCounts() {
  // Retrieve the vote counts
  const option1Count = await contract.methods.getVoteCount(1).call();
  const option2Count = await contract.methods.getVoteCount(2).call();
  const option3Count = await contract.methods.getVoteCount(3).call();

  // Update the vote counts in the UI
  document.getElementById('option1Count').textContent = option1Count;
  document.getElementById('option2Count').textContent = option2Count;
  document.getElementById('option3Count').textContent = option3Count;
}

async function castVote() {
  // Check if the user has a connected wallet
  if (!web3.currentProvider.selectedAddress) {
    alert('Please connect your wallet to cast a vote.');
    return;
  }

  const selectedOption = document.getElementById('voteOption').value;

  try {
    // Cast the vote
    await contract.methods.castVote(selectedOption).send({ from: web3.currentProvider.selectedAddress });

    // Update the vote counts
    await updateVoteCounts();

    alert('Vote casted successfully!');
  } catch (error) {
    console.error('Error while casting vote:', error);
    alert('Failed to cast vote. Please try again.');
  }
}
