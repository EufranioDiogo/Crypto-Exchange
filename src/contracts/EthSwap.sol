//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./Token.sol";
import "./Token2.sol";
import "./Token3.sol";

contract EthSwap
{
    string public name = "EthSwap Instant Exchange";
    Token public token;
    Token2 public token2;
    Token3 public token3;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token, Token2 _token2, Token3 _token3) public 
    {
        token = _token;
        token2 = _token2;
        token3 = _token3;
    }

    function buyTokens() public payable
    {
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;

        // Require that EthSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public
    {
        if (msg.sender == address(token)) {
            // User can't sell more tokens than they have
            require(token.balanceOf(msg.sender) >= _amount);

            // Calculate the amount of Ether to redeem
            uint etherAmount = _amount / rate;

            // Require that EthSwap has enough tokens
            require(address(this).balance >= etherAmount);
            
            // Perform sale
            token.transferFrom(msg.sender, address(this), _amount);

            msg.sender.transfer(etherAmount);

            // Emit an event
            emit TokensSold(msg.sender, address(token), _amount, rate);
        }
        
    }
}