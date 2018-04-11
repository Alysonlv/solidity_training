const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'receive below anger claw arena pony attitude tumble what spider captain palace',
  'https://rinkeby.infura.io/IYs36csKGdfTDjh1sPC4 '
);
const web3 = new Web3(provider);

const INITIAL_MESSAGE = 'Alyson Vasconcelos - Mastering Solidity Lottery!';

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account:', accounts[0]);

  const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('---------------------------------------------------------');
  console.log(interface);
  console.log('---------------------------------------------------------');
  console.log('Contract deployed to:', deployedContract.options.address);
};
deploy();