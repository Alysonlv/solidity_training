const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const compiledCampaignContract = require('../ethereum/build/CampaignContract.json');
const compiledCampaignFactory = require('../ethereum/build/CampaignFactoryContract.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.interface))
    .deploy({data: compiledCampaignFactory.bytecode})
    .send({from: accounts[0], gas: '1000000'});

    await factory.methods.createCampaign('100', 'Super PC Wearable').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaignContract.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('Deploys factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('Marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('Checking the Campaign title', async () => {
        const projectName = await campaign.methods.projectName().call();
        assert.equal('Super PC Wearable', projectName);
    });

    it('Allows people to contribute with ethereum and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '142',
            from: accounts[1]
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();

        assert(isContributor);
    });

    it('Require a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '99',
                from: accounts[1]
            });
            assert(false);
        } catch (error) {
            assert(true);
        }
    });

    it('Allows a manager to make a payment request', async () => {
        await campaign.methods
            .createExpenseRequest('Buy Extremis serum', '1500', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        const expense = await campaign.methods.expensesRequests(0).call();

        assert.equal('Buy Extremis serum', expense.description);

        it('Processes requests', async () => {
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei('10','ether')
            });

            await campaign.methods
                .createExpenseRequest('Buy antimatter', web3.utils.toWei('5','ether'), accounts[1])
                .send({
                    from: accounts[0],
                    gas: '1000000'
                });
            
            await campaign.methods.approveExpense(0)
                .send({
                    from: accounts[0],
                    gas: '1000000'
                });

            await campaign.methods.finalizeExpense(0).call();

            let balance = await web3.eth.getBalance(accounts[1]);
            balance = web3.utils.fromWei(balance, 'ether');
            balance = parseFloat(balance);

            assert(balance > 101);
        });
    });
});