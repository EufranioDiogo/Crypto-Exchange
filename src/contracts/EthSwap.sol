//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./Token.sol";
import "./Token2.sol";
import "./Token3.sol";



contract EthSwap
{
    using SafeMath for uint256;
    string public name = "EthSwap Instant Exchange";
    Token public token1;
    Token2 public token2;
    Token3 public token3;
    uint public rate = 100;
    uint256 constant WAD = 10**18;
    uint256 idPivo = 0;
    uint rangeLimit = 10;
    address public owner;
    mapping(address => uint256) public balanceOfToken1;


    event TokensPurchased(
        address account,
        address token1,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token1,
        uint amount,
        uint rate
    );

    constructor(Token _token, Token2 _token2, Token3 _token3) public
    {
        token1 = _token;
        token2 = _token2;
        token3 = _token3;
        owner = msg.sender;
    }


    function swap(address _from, address _to, uint256 amount, string memory orig, string memory dest) public payable {
        if (keccak256(bytes(orig)) == keccak256("UCANA")) {
            amount = amount * WAD;

            token1.transferFrom(_from, _to, amount);

            if (keccak256(bytes(dest)) == keccak256("UCANU")) {
                token2.transfer(_from, token1.getUmToken1EquivaleQuantosToken2() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANE")) {
                token3.transfer(_from, token1.getUmToken1EquivaleQuantosToken3() * amount);
            }
        }
        else if (keccak256(bytes(orig)) == keccak256("UCANU")) {
            token2.transferFrom(_from, _to, amount);

            if (keccak256(bytes(dest)) == keccak256("UCANA")) {
                token1.transfer(_from, token2.getUmToken2EquivaleQuantosToken1() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANE")) {
                token3.transfer(_from, token2.getUmToken2EquivaleQuantosToken3() * amount);
            }
        }
        else if (keccak256(bytes(orig)) == keccak256("UCANE")) {
            token3.transferFrom(_from, _to, amount);

            if (keccak256(bytes(dest)) == keccak256("UCANA")) {
                token1.transfer(_from, token3.getUmToken3EquivaleQuantosToken1() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANU")) {
                token2.transfer(_from, token3.getUmToken3EquivaleQuantosToken2() * amount);
            }
        }
        sortPivo();
    }


    // function to give the right price value

    function sortPivo() private {
        uint256 sorted = random(rangeLimit)+1;

        uint256 equivalencia1 = ((random(rangeLimit)) + 1) * WAD ;
        uint256 equivalencia2 = ((random(rangeLimit)) + 1) * WAD;

        if (sorted <= 2) {
            // Token1 is the pivo
            
            token1.setUmToken1EquivaleQuantosToken2(equivalencia1);
            token1.setUmToken1EquivaleQuantosToken3(equivalencia2);

            token2.setUmToken2EquivaleQuantosToken1(wdiv(1, equivalencia1));
            token3.setUmToken3EquivaleQuantosToken1(wdiv(1, equivalencia2));

            token2.setUmToken2EquivaleQuantosToken3(wdiv(equivalencia2, equivalencia1));
            token3.setUmToken3EquivaleQuantosToken2(wdiv(equivalencia1, equivalencia2));
            idPivo = 1;
        } else if (sorted <= 5) {
            // Token2 is the pivo
            
            token2.setUmToken2EquivaleQuantosToken1(equivalencia1 * WAD);
            token2.setUmToken2EquivaleQuantosToken3(equivalencia2 * WAD);

            token1.setUmToken1EquivaleQuantosToken2(wdiv(1, equivalencia1));
            token3.setUmToken3EquivaleQuantosToken1(wdiv(1, equivalencia2));

            token1.setUmToken1EquivaleQuantosToken3(wdiv(equivalencia2, equivalencia1));
            token3.setUmToken3EquivaleQuantosToken2(wdiv(equivalencia1, equivalencia2));
            idPivo = 2;
        } else {
            // Token3 is the pivo
            
            token3.setUmToken3EquivaleQuantosToken1(equivalencia1);
            token3.setUmToken3EquivaleQuantosToken2(equivalencia2);

            token1.setUmToken1EquivaleQuantosToken3(wdiv(1, equivalencia1));
            token2.setUmToken2EquivaleQuantosToken3(wdiv(1, equivalencia2));

            token1.setUmToken1EquivaleQuantosToken3(wdiv(equivalencia2, equivalencia1));
            token2.setUmToken2EquivaleQuantosToken3(wdiv(equivalencia1, equivalencia2));
            idPivo = 3;
        }
    }

    function getIdPivo() public returns (uint256) {
        return idPivo;
    }

    

    function wmul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = add(mul(x, y), WAD / 2) / WAD;
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function wdiv(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = add(mul(x, WAD), y / 2) / y;
    }

    function random(uint mod) internal returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % mod;
    }

    function helloWorld() public view returns(string memory) {
        return "Ola mundo"; 
    }

    function getBalanceOfToken1() public returns (uint256) {
        return token1.balanceOfToken(msg.sender);
    }

    function getBalanceOfToken2() public returns (uint256) {
        return token2.balanceOfToken(msg.sender);
    }

    function getBalanceOfToken3() public returns (uint256) {
        return token3.balanceOfToken(msg.sender);
    }

    function getBalanceOfTotal() public returns (uint256) {
        return token3.balanceOfToken(msg.sender);
    }
}