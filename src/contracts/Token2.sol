//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
import './StandardToken.sol';
  
contract Token2 is StandardToken
{
    string public name = "UCANU Token"; 
    string public symbol = "UCANU";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 1500001 * (10 ** decimals);
    uint256 public totalSupply_;
    uint256  public umToken2EquivaleQuantosToken1 = 0;
    uint256  public umToken2EquivaleQuantosToken3 = 0;

    constructor() public
    {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function getTokenSymbol() public view returns(string memory) {
        return symbol;
    }
    
    function setUmToken2EquivaleQuantosToken1(uint256 new_value) external {
        umToken2EquivaleQuantosToken1 = new_value;
    }

    function setUmToken2EquivaleQuantosToken3(uint256 new_value) external {
        umToken2EquivaleQuantosToken3 = new_value;
    }

    function getUmToken2EquivaleQuantosToken1() external returns (uint256) {
        return umToken2EquivaleQuantosToken1;
    }
    function getUmToken2EquivaleQuantosToken3() external returns (uint256) {
        return umToken2EquivaleQuantosToken3;
    }
    function balanceOfToken(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}