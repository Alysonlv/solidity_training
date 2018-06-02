/*
This file will provide the contract of Factory to the project
*/
import web3 from './web3';
import CampaignFactoryContract from './build/CampaignFactoryContract.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactoryContract.interface),
    '0x7D1aA071DB5D48D683b1404f7c44044FeE9a237B'
);

export class CampaignFactoryService {

    static async getDeployedCampaigns() {
        return await instance.methods.getDeployedCampaigns().call();;
    }

    static async createCampaign(minimumContribution, projectName, account) {
        await instance.methods
                    .createCampaign(minimumContribution, projectName)
                    .send({
                        from: account
                    });
    }

}