SIMPLIFYING COMMAND-BASED DEPLOYMENT WITH NODE.JS

C:\Program Files\geth>geth --testnet --rpc --rpcapi="db,eth,net,web3,personal,web3"

C:\Ethereum\SimpleCoinWithNode>node
>

>const Web3 = require('web3');
>web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
>web3.eth.getAccounts(console.log);

>.exit

C:\Ethereum\SimpleCoinWithNode>npm install solc@0.4.24

C:\Ethereum\SimpleCoinWithNode>node
>
//1 File system package

>const fs = require('fs');          

//2 Solidity compiler package

>const solc = require('solc');      

//3 Web3 package
>const Web3 = require('web3');      

>const web3 = new Web3(new Web3.providers.HttpProvider("http://10.10.152.10:8000"));

>const initialSupply = 10000;
>const account2 = web3.eth.accounts[1];
>const sender = account2;
>const senderPassword = 'account2';
>const source = fs.readFileSync('C:/Users/Kyaw Myo Hlaing/project/compilemethod/contracts/SimpleCoin.sol','utf8');
>const compiledContract = solc.compile(source, 1);
>const abi = compiledContract.contracts[':SimpleCoin'].interface;
>const bytecode = '0x' + 
compiledContract.contracts[':SimpleCoin'].bytecode;
>const gasEstimate = web3.eth.estimateGas({ data: bytecode }) + 100000;

>const SimpleCoinContractFactory = web3.eth.contract(JSON.parse(abi));

>web3.personal.unlockAccount(sender, senderPassword);
>const simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
    from: sender,
    data: bytecode,
    gas: gasEstimate
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' 
         + contract.address 
         + ' transactionHash: ' 
         + contract.transactionHash);
    }
 });


 //Interacting with a contract from Node.js

 >const fs = require('fs');
>const solc = require('solc');
>const Web3 = require('web3');
>const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const source = fs.readFileSync('c:/Ethereum/SimpleCoinWithNode/SimpleCoin.sol', 'utf8');
const compiledContract = solc.compile(source, 1);
const abi = compiledContract.contracts[':SimpleCoin'].interface;

const SimpleCoinContractFactory = web3.eth.contract(JSON.parse(abi));

const contractAddress =
'0xa9d460c5aba794db20d005f54e8eefa80b76ff2e'; 
//replace appropriately 

const simpleCoinInstance = SimpleCoinContractFactory.at(contractAddress);
>const account2 = web3.eth.accounts[1]; 
>const account3 = web3.eth.accounts[2]; 

>var account2Balance = simpleCoinInstance.coinBalance(account2);
>var account3Balance = simpleCoinInstance.coinBalance(account3);

>console.log('BALANCES BEFORE transferring tokens');
>console.log('Account 2 balance: ' + account2Balance);
>console.log('Account 3 balance: ' + account3Balance);
Finally, unlock account2 so you can sign and execute the transfer transaction from it:

>web3.personal.unlockAccount(account2, "account2");
Then you can execute the transfer transaction and assign its hash to a variable:

>var transactionHash = simpleCoinInstance.transfer(
account3, 20, {from:account2,gas:200000});
console.log(
'SUBMITTED transfer() transaction. Transaction hash: ' 
+ transactionHash);
Poll the status of the transaction until completion as follows:

>var transactionReceipt = null;
>while (transactionReceipt == null)
{
     transactionReceipt = web3.eth.getTransactionReceipt(transactionHash);
}

>console.log('COMPLETED transfer() transaction. Transaction: ' +
transactionHash + 'has been consolidated on block: ' +
transactionReceipt.blockNumber);

>account2Balance = simpleCoinInstance.coinBalance(account2);
>account3Balance = simpleCoinInstance.coinBalance(account3);

>console.log('BALANCES AFTER transferring tokens');
>console.log('Account 2 balance: ' + account2Balance);;
>console.log('Account 3 balance: ' + account3Balance);


//C:\Users\Kyaw Myo Hlaing\project\match> solcjs --bin --base-path . ./SimpleCoin.sol