import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); //this is used to override the web3 injected in browser form Metamask

export default web3;