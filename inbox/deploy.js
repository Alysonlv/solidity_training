const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'napkin cry else wear suggest clog discover custom warfare erase hollow number',
  'https://rinkeby.infura.io/IYs36csKGdfTDjh1sPC4 '
);
const web3 = new Web3(provider);

const INITIAL_MESSAGE = 'Alyson Vasconcelos is becoming a Ethereum and Solidity Master!';

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account:', accounts[0]);

  const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to:', deployedContract.options.address);
};
deploy();