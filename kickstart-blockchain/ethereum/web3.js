import Web3 from 'web3';

//this will force use the Web3 provided by Metamask
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    //there are no metamask running *OR* we are on the server
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/IYs36csKGdfTDjh1sPC4'
    );
    web3 = new Web3(provider);
}

export default web3;