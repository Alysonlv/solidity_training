import web3 from './web3';
import CampaignContract from './build/CampaignContract.json';
import {CampaignFactoryService} from './CampaignFactoryService';

function getInstance(address) {
    let instance =  new web3.eth.Contract(
        JSON.parse(CampaignContract.interface),
        address
    );

    return instance;
}

export class CampaignService {
   
    static async getCampaignDetails(address) {
        let instance =  getInstance(address);
        const campaign = await instance.methods.getCampaignDetail().call();
   
        return {
            minimumContribution: campaign[0],
            balance: campaign[1],
            expensesRequestsCount: campaign[2],
            approversCount: campaign[3],
            manager: campaign[4],
            projectName: campaign[5]
        };;
    }
   
    static async getCampaignName(address) {
        let instance =  getInstance(address);
        return await instance.methods.projectName().call();
    }

    static async getSummary() {
        var addresses = await CampaignFactoryService.getDeployedCampaigns();
        var arr = new Array();
        
        for (var i = 0; i < addresses.length; i++) {
            const ad = addresses[i];
            var nome = this.getCampaignName(addresses[i]);

            var summary = new Object();
            
           var n = await nome.then(function(result) {
                summary.projectName = result;
                summary.address = ad;

                arr.push(summary);

                return result;
            }); 
            
        }
        
        return arr;
    }

    static async contribute(address, account, etherValue) {
        var instance =  getInstance(address);
        await instance.methods.contribute().send({
            from: account,
            value: web3.utils.toWei(etherValue, 'ether')
        });
    }

    static async getExpensesRequest(contractAddress) {
        var instance =  getInstance(contractAddress);

        var expensesCount = await instance.methods.getRequestsCount().call();

        const expensesRequest = await Promise.all(
            Array(parseInt(expensesCount)).fill().map((element, index) => {
                return instance.methods.expensesRequests(index).call();
            })
        );
        
        return {expensesCount, expenses};
    }

    static async addExpenseRequest(contractAddress, account, description, value, recipient) {
        var instance =  getInstance(contractAddress);
        
        await instance.methods.createExpenseRequest(
            description, 
            web3.utils.toWei(value, 'ether'), 
            recipient
        ).send({
            from: account
        });
    }
    
}
