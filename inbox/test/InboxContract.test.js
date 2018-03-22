const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Use a capital W for convention - it's used as a constructor

const provider = ganache.provider();
const web3 = new Web3(provider); //Tell the Web3 instance to conect with the TestRPC (ganache) network

const { interface, bytecode } = require('../compile');

let accounts;
let inboxContract;
const INITIAL_MESSAGE = 'Becoming a Ethereum and Solidity Master!';

before(async () => {
    // Get a list of all - gonna be 10 - accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inboxContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy(
            { 
                data: bytecode, 
                arguments: [INITIAL_MESSAGE]
            }
        )
        .send(
            { 
                from: accounts[0],
                gas: '1000000'
            }
        );
        
    inboxContract.setProvider(provider);
});

describe('InboxContract', () => {
    it('Deploy the contract', () => {
        assert.ok(inboxContract.options.address);
        // console.log(inboxContract);
        // console.log(accounts);
        // console.log(web3.eth.getBalance(accounts[0], 0, function(error, result) {
        //     console.log('balance of accounts[0] = ' + result);
        // }));
    });

    it('Has a default message', async () => {
        const message = await inboxContract.methods.message().call();
        assert.equal(INITIAL_MESSAGE, message);
    });

    it('Update message', async () => {
        const newMessage = 'A master in Ethereum and Solidity become!';
        
        await inboxContract.methods.setMessage(newMessage)
                .send({
                    from: accounts[0]
                });

        const message = await inboxContract.methods.message().call();
        assert.equal(newMessage, message);
    })
});