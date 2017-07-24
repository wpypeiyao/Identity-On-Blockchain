//check the correct connection with web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//print the currnet accounts in the network
var accounts = web3.eth.accounts;
console.log(accounts);


