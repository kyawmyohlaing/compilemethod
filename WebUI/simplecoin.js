//1 Replace this with the address of the SimpleCoin contract you just deployed on Ganache.
var web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545"));
    
    var abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\
    "address\"},{\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\
    "transfer\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\
    "constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\
    ":\"coinBalance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\
    "payable\":false,\"type\":\"function\"},{\"inputs\":[{\"name\":\
    "_initialSupply\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\
    "constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\
    ":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\
    ":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\
    "}],\"name\":\"Transfer\",\"type\":\"event\"}]";
    var SimpleCoinContractFactory = web3.eth.contract(JSON.parse(abi));
    var simpleCoinContractInstance = SimpleCoinContractFactory.at(
    '0xedaa9632746aa82b0f1f73185c38a437643116af');                   
    var accounts = web3.eth.accounts;

    //    2 Reports an updated account balance

    function refreshAccountsTable() {                                
         var innerHtml = 
     //    3 Builds the HTML account balance table dynamically
            "<tr><td>Account</td><td>Balance</td>";                
   

    //4 All accounts are iterated to build the account balance HTML.

         for (var i = 0; i < accounts.length; i++) {                 
                var account = accounts[i];
                var balance = 
                    simpleCoinContractInstance
    // 5 Calls the coin balance getter

                     .coinBalance(account);                          
                innerHtml = innerHtml + 
                  "<tr><td>" + 
                  account + "</td><td>" 
                  + balance + "</td></tr>";
         }
         
         $("#accountsBalanceTable").html(innerHtml);
    }
//    6 Gets the input from the UI and feeds it to the coin transfer contract function
   
    function transferCoins() {                                       
         var sender = $("#from").val();
         var recipient = $("#to").val();
         var tokensToTransfer = $("#amount").val();
//    7 Invokes the coin transfer contract function

         simpleCoinContractInstance.transfer(                        
            recipient, 
            tokensToTransfer, 
            {from:sender,gas:200000},
            function(error, result){
               if(!error)
//    8 The callback associated with a successful transfer refreshes the account balance table.

                  refreshAccountsTable();                            
               else
                  console.error(error);
            }
         );
    }
//    9 Renders the account balance table on opening the page
    $( document ).ready(function() {                                 
         refreshAccountsTable();
    });
    
