//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
import './StandardToken.sol';


contract Token3 is StandardToken
{

    string public name = "UCANE Token"; 
    string public symbol = "UCANE";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 1500001 * (10 ** decimals);
    uint256  public umToken3EquivaleQuantosToken1 = 0;
    uint256  public umToken3EquivaleQuantosToken2 = 0;

    constructor(uint totalSupply) public
    {
        totalSupply_ = totalSupply * (10 ** decimals);
        balances[msg.sender] = totalSupply * (10 ** decimals);
    }

    function getTokenSymbol() public view returns(string memory) {
        return symbol;
    }

    function setUmToken3EquivaleQuantosToken1(uint256 new_value) external {
        umToken3EquivaleQuantosToken1 = new_value;
    }

    function setUmToken3EquivaleQuantosToken2(uint256 new_value) external {
        umToken3EquivaleQuantosToken2 = new_value;
    }

    function getUmToken3EquivaleQuantosToken1() external returns (uint256) {
        return umToken3EquivaleQuantosToken1;
    }
    function getUmToken3EquivaleQuantosToken2() external returns (uint256) {
        return umToken3EquivaleQuantosToken2;
    }
    function balanceOfToken(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}