pragma solidity ^0.4.24;
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