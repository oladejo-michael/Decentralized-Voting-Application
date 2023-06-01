# Decentralized Voting Application

This is a simple decentralized voting application built using web3.js and Solidity smart contracts. The application allows users to cast their votes for different options and displays the vote counts in real-time.

## Features

- Cast votes for different options
- Real-time vote count updates
- Connects to a local development network or an Ethereum network for testing

## Prerequisites

- Node.js (v14 or higher)
- Truffle (v5.4 or higher) - [Installation Guide](https://www.trufflesuite.com/docs/truffle/getting-started/installation)
- Ganache or any other Ethereum development network - [Ganache](https://www.trufflesuite.com/ganache)
- MetaMask browser extension - [MetaMask](https://metamask.io/)

## Installation

1. Clone the repository:

git clone https://github.com/your-username/decentralized-voting.git


2. Navigate to the project directory:

cd decentralized-voting


3. Install the dependencies:

npm install


## Smart Contract Development

The smart contract for the decentralized voting application is developed using Solidity. The contract code is located in the `contracts/Voting.sol` file.

### Compilation

To compile the smart contract, use the following command:

truffle compile


The compiled contract artifacts will be generated in the `build/contracts` directory.

### Deployment

#### Online Deployment (Ethereum Network)

1. Update the `truffle-config.js` (or `truffle.js`) file with your Ethereum network configuration, such as the network provider URL and account mnemonic.

2. Deploy the smart contract to the Ethereum network using the following command:

truffle migrate --network <network-name>
  

Replace `<network-name>` with the name of the desired Ethereum network from your `truffle-config.js` (or `truffle.js`) file, such as `ropsten` or `mainnet`.

3. Make a note of the deployed contract address and ABI, which will be displayed in the console after the migration is successful.

#### Offline Deployment (Local Development Network)

1. Set up a local development network, such as Ganache, on your machine.

2. Deploy the smart contract to the local development network using the following command:

truffle migrate --network development
  

This will deploy the smart contract to your local development network and provide you with the contract address and ABI.

Note: Make sure your local development network is running before executing this command.

## Front-End Development

The front-end of the decentralized voting application is built using HTML, CSS, and JavaScript with the web3.js library for interacting with the Ethereum network.

The front-end code is located in the `index.html` and `app.js` files.

### Configuration

1. Open the `app.js` file and locate the following lines of code:

```javascript
const contractAddress = 'CONTRACT_ADDRESS';
const contractABI = CONTRACT_ABI;

2. Replace 'CONTRACT_ADDRESS' with the deployed contract address obtained from the deployment step.

3. Replace CONTRACT_ABI with the actual contract ABI obtained from the deployment step.

Running the Application
Online Deployment
1. Ensure that the MetaMask browser extension is installed and set up in your browser.
2. Open the index.html file in a web browser.
3. Connect MetaMask to the desired Ethereum network (e.g., Ropsten, Mainnet) and switch to the account you used for deployment.
