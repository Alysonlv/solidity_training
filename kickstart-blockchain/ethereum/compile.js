const path = require('path');
const solc = require('solc');
const fs   = require('fs-extra');

//Code to delete the build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//Read CampaignContract.sol
const campaignContractPath   = path.resolve(__dirname, 'contracts', 'CampaignContract.sol');
const campaignContractSource = fs.readFileSync(campaignContractPath, 'utf8');
const campaignContractOutPut = solc.compile(campaignContractSource, 1).contracts;

//Recreate build folder
fs.ensureDirSync(buildPath);

for (let contract in campaignContractOutPut) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        campaignContractOutPut[contract]
    );
}
