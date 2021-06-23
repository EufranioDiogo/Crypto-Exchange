//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
import './StandardToken.sol';

contract Token is StandardToken
{
    string public name = "UCANA Token"; 
    string public symbol = "UCANA";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 1500001 * (10 ** decimals);
    uint256 public totalSupply_;
    uint256  public umToken1EquivaleQuantosToken2 = 0;
    uint256  public umToken1EquivaleQuantosToken3 = 0;


    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

    function getTokenSymbol() public view returns(string memory) {
        return symbol;
    }

    function setUmToken1EquivaleQuantosToken2(uint new_value) public {
        umToken1EquivaleQuantosToken2 = new_value;
    }

    function setUmToken1EquivaleQuantosToken3(uint new_value) public {
        umToken1EquivaleQuantosToken3 = new_value;
    }

    function getUmToken1EquivaleQuantosToken2() public returns (uint) {
        return umToken1EquivaleQuantosToken2;
    }

    function getUmToken1EquivaleQuantosToken3() public returns (uint) {
        return umToken1EquivaleQuantosToken3;
    }
    function balanceOfToken(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}