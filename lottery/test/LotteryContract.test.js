const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Use a capital W for convention - it's used as a constructor

const provider = ganache.provider();
const web3 = new Web3(provider); //Tell the Web3 instance to conect with the TestRPC (ganache) network

const { interface, bytecode } = require('../compile');

let accounts;
let lotteryContract;
const LOTTERY_NAME = 'Mastering Solidity Lottery!';
let manager;

beforeEach(async () => {
    // Get a list of all - gonna be 10 - accounts
    accounts = await web3.eth.getAccounts();
    manager = accounts[0];

    // Use one of those accounts to deploy the contract
    lotteryContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy(
            { 
                data: bytecode, 
                arguments: [LOTTERY_NAME]
            }
        )
        .send(
            { 
                from: manager,
                gas: '1000000'
            }
        );
        
        lotteryContract.setProvider(provider);
});

describe('LotteryContract', () => {
    it('Deploy the contract is OK', () => {
        assert.ok(lotteryContract.options.address);
    });

    it('Contract has a name', async () => {
        const name = await lotteryContract.methods.lotteryName().call();
        assert.equal(LOTTERY_NAME, name);
    });

    it('Allows one account to enter', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lotteryContract.methods.getPlayers().call({
            from: manager
        });

        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
    });


    it('Allows multiples account to enter', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotteryContract.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lotteryContract.methods.getPlayers().call({
            from: manager
        });

        assert.equal(accounts[2], players[1]);
        assert.equal(2, players.length);
    });

    it('Premium verified', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('1', 'ether')
        });
        await lotteryContract.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('3', 'ether')
        });
        
        const premium = await web3.eth.getBalance(lotteryContract.options.address);
        
        assert.equal(4, web3.utils.fromWei(premium, 'ether'));
    });

    it('Requires a minimum amount of ether to enter', async () => {
        try {
            await lotteryContract.methods.enter().send({
                from: accounts[3],
                value: web3.utils.toWei('0.01', 'ether')
            });
            assert(false);
        } catch(err) {
            assert(err);
        }        
    });

    it('Manager could not enter', async () => {
        try {
            await lotteryContract.methods.enter().send({
                from: manager,
                value: web3.utils.toWei('0.02', 'ether')
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    it('Only manager could pick the winner', async () => {
        try {
            await lotteryContract.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    it('Sends money to the winner and resets the players array', async () => {

        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2', 'ether')
        });

        const enteringBalance = await web3.eth.getBalance(accounts[1]);

        await lotteryContract.methods.pickWinner().send({
            from: manager
        });

        const finalBalance = await web3.eth.getBalance(accounts[1]);
        const difference = finalBalance - enteringBalance;

        assert(difference > web3.utils.toWei('1.8', 'ether'));
    });

    it('Players were reseted', async () => {

        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2', 'ether')
        });

        const enteringBalance = await web3.eth.getBalance(accounts[1]);

        await lotteryContract.methods.pickWinner().send({
            from: manager
        });

        const players = await lotteryContract.methods.getPlayers().call({
            from: manager
        });

        assert.equal(0, players.length);
    });

});