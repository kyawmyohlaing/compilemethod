//C:\Ethereum\SimpleCoin>..\solidity-windows\solc.exe 
 //--bin -o bin --combined-json abi,bin SimpleCoin.sol

 //The geth interactive JavaScript instructions to deploy a contract

// 1 SimpleCoin constructor input

 var initialSupply = 10000; 

//2 Contract ABI, copied from the abi member of the SimpleCoin.out compilation output file
 var simpleCoinAbi =                                       
 


[{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name"
:"_amount","type":"uint256"}],"name":"transfer","outputs":[],"payable":false
,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}]
,"name":"coinBalance","outputs":[{"name":"","type":"uint256"}],"payable"
:false,"type":"function"},{"inputs":[{"name":"_initialSupply","type"
:"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false
,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true
,"name":"to","type":"address"},{"indexed":false,"name":"value","type"
:"uint256"}],"name":"Transfer","type":"event"}];    
//abi interface from solc output

 //3 Initializes contract factory with the contract ABI
var SimpleCoinContractFactory = 
   web3.eth.contract(simpleCoinAbi);                     

//4 Instantiates the contract


var simpleCoinInstance = 
   SimpleCoinContractFactory.new(                        
   initialSupply,
   {
     from: web3.eth.accounts[0], 
//5 The contract bytecode, copied from the bin member of the SimpleCoin.out compilation output file

     data:                                               
'0x608060405234801561001057600080fd5b506040516020806103998339
8101806040528101908080519060200190929190505050806000803373ffffffffffffffffff
ffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020
019081526020016000208190555050610313806100866000396000f300608060405260043610
61004c576000357c010000000000000000000000000000000000000000000000000000000090
0463ffffffff168063a9059cbb14610051578063fabde80c1461009e575b600080fd5b348015
61005d57600080fd5b5061009c600480360381019080803573ffffffff', 
     gas: '3000000'      
//6 Triggers registration of callback at completion of the deployment process
   }, function (e, contract){                            
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' 
         + contract.address + ' transactionHash: ' 
         + contract.transactionHash);
    }
 });

 //> web3.eth.accounts
 //>personal.unlockAccount("0xedDE06bC0e45645e2f105972BDefC220ED37Ae10", PASSWORD_OF_YOUR_ACCOUNT_0)
 //geth --unlock <YOUR_ACCOUNT_ADDRESS> --password <YOUR_PASSWORD>
 //>simpleCoinInstance.coinBalance(eth.accounts[0])
 //> simpleCoinInstance.transfer(eth.accounts[2], 150,{from:eth.accounts[0],gas:200000});
 //>personal.unlockAccount(eth.accounts[0], 'PASSWORD_OF_ACCOUNT_0')
 //> personal.unlockAccount(eth.coinbase, "PASSWORD OF ETHERBASE ACCOUNT");
//> eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value: web3.toWei(2.0, "ether")})

 //running contract
 //C:\Program Files\geth>geth attach ipc:\\.\pipe\geth.ipc

 //1 The abi interface from solc SimpleCoin output

 var remoteSimpleCoinAddress = "0x4291f37a727d32e5620a0a4ed61d27ffdad757af";
var simpleCoinAbi =
      [{"constant":false,"inputs":[{"name":"_to","type":"address"},
{"name":"_amount","type":"uint256"}],
"name":"transfer","outputs" :[],"payable":false,"type":"function"},
{"constant":true,"inputs" :[{"name":"","type":"address"}],
"name":"coinBalance","outputs" :[{"name":"","type":"uint256"}],
"payable":false,"type" :"function"},
{"inputs":[{"name": "_initialSupply","type":"uint256"}],
"payable":false,"type": "constructor"},{"anonymous":false,
"inputs":[{"indexed":true, "name":"from","type":"address"},
{"indexed":true,"name":"to", "type":"address"},
{"indexed":false,"name":"value", "type":"uint256"}],
"name":"Transfer","type": "event"}];     
//2 Creates a proxy to the SimpleCoin contract                  
var SimpleCoinContractProxy = 
   web3.eth. contract(simpleCoinAbi);        
//3 Connects to the instance of SimpleCoin deployed earlier              
var simpleCoinInstance =                                   
     SimpleCoinContractProxy. at(remoteSimpleCoinAddress);


//Referencing a deployed contract from another contract
contract SimpleCoinProxy {
    function transfer(address _to, uint256 _amount) public;
}
 
contract MyContract {
    SimpleCoinProxy simpleCoinProxy;
    
    function MyContract(address _simpleCoinAddress)
    {
        require(_simpleCoinAddress != 0x0);
        simpleCoinProxy = SimpleCoinProxy(_simpleCoinAddress); 
    }
    

    function transferSimpleCoin(address _to, uint256 _amount) {
        simpleCoinProxy.transfer(_to, _amount) ;
    }
}