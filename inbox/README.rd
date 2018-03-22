Udemy Training by Stephen Grider. https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/overview

STRONGLY RECOMMEND TAKE THE TRAINING

-> Create a node project "npm init"

    - File "compile.js" configure the compile process to *.sol files

-> Install the compiler "solc" package: "npm install --save solc"

-> Install test package "TestRPC": "npm install --save testrpc

** To use on windows
 * The follow command will instll a few buil tools that are required to install web3
 * Need to use administrative level
 - "npm install --global --production windows-build-tools"
**

- "npm install --save mocha ganache-cli web3@1.0.0-beta.26"
- Configure test mocha in package.json

- Install to access wallet "npm install --save truffle-hdwallet-provider"
    will allow the code access the network and unlock accounts

- To deploy the contract on Rinkeby just use node to execute the deploy.js file

