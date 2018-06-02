import web3 from './web3';

export class Utils {
    static async getAccounts() {
        var accounts = await web3.eth.getAccounts();
        return await accounts;
    }
}