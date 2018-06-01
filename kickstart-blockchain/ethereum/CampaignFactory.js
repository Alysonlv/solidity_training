/*
This file will provide the contract of Factory to the project
*/
import web3 from './web3';
import CampaignFactoryContract from './build/CampaignFactoryContract.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactoryContract.interface),
    '0x329A1c71Ba4c53dcfb18F40b327ba0026EF66F93'
);

export class CampaignFactory {

    static async getDeployedCampaigns() {
        console.log(instance);
        return await instance.methods.getDeployedCampaigns().call();;
    }

}