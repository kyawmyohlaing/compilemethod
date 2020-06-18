pragma solidity ^0.4.8;

import "./MintableToken.sol";
import "./BlockableToken.sol";

/***@title CrowdsaleToken83
* @dev Simple ERC20 Token example, with crowdsale token creation and blocks forvoting
*/


contract StarkyToken is MintableToken, BlockableToken{
        string public constant name = "StarkyToken";
        string public constant symbol = "ST";
        uint public constant decimals = 18;
    }

