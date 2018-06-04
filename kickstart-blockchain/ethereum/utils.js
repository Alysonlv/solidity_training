import web3 from './web3';

export class Utils {
    static async getAccounts() {
        var accounts = await web3.eth.getAccounts();
        return await accounts;
    }

    static toWei(value) {
        return web3.utils.toWei(value, 'ether');
    }

    static fromWei(value) {
        return web3.utils.fromWei(value, 'ether');
    }
}