//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Token3
{
    string public name = "UCANE Token";
    string public symbol = "UCANE";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8 public decimals = 18;
    uint  public umToken3EquivaleQuantosToken1 = 0;
    uint  public umToken3EquivaleQuantosToken2 = 0;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public
    {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);       
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function getTokenSymbol() public view returns(string memory) {
        return symbol;
    }

    function setUmToken3EquivaleQuantosToken1(uint new_value) public {
        umToken3EquivaleQuantosToken1 = new_value;
    }

    function setUmToken3EquivaleQuantosToken2(uint new_value) public {
        umToken3EquivaleQuantosToken2 = new_value;
    }

    function getUmToken3EquivaleQuantosToken1() public returns (uint) {
        return umToken3EquivaleQuantosToken1;
    }
    function getUmToken3EquivaleQuantosToken2() public returns (uint) {
        return umToken3EquivaleQuantosToken2;
    }
}