/*
This file will provide the contract of Factory to the project
*/
import web3 from './web3';
import CampaignFactoryContract from './build/CampaignFactoryContract.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactoryContract.interface),
    '0xb09bB3e8e10C31E4B608c7DaDf9b4E28489Cc359'
);

export default instance;