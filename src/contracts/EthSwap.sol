//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "./Token.sol";
import "./Token2.sol";
import "./Token3.sol";
import "./SafeMath.sol";


contract EthSwap
{
    using SafeMath for uint256;
    string public name = "EthSwap Instant Exchange";
    Token public ucana;
    Token2 public ucanu;
    Token3 public ucane;
    uint public rate = 100;
    uint256 constant WAD = 10**18;
    uint256 idPivo = 0;
    uint rangeLimit = 10;
    address public owner;
    mapping(address => uint256) public balanceOfToken1;
    string public entrou;


    event TokensPurchased(
        address account,
        address ucana,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address ucana,
        uint amount,
        uint rate
    );

    constructor(Token _token, Token2 _ucanu, Token3 _ucane) public
    {
        ucana = _token;
        ucanu = _ucanu;
        ucane = _ucane;
        owner = msg.sender;
        sortPivo();
    }

    /*
    
    */
    function swap(address _from, address _to, uint256 amount, string memory orig, string memory dest) public payable {
        if (keccak256(bytes(orig)) == keccak256("UCANA")) {
            ucana.transferFrom(_from, _to, amount * WAD);
//
            if (keccak256(bytes(dest)) == keccak256("UCANU")) {
                ucanu.transferFrom(_to, _from, ucana.getUmToken1EquivaleQuantosToken2() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANE")) {
                ucane.transferFrom(_to, _from, ucana.getUmToken1EquivaleQuantosToken3() * amount);
            }
        }
        else if (keccak256(bytes(orig)) == keccak256("UCANU")) {
            ucanu.transferFrom(_from, _to, amount * WAD);

            if (keccak256(bytes(dest)) == keccak256("UCANA")) {
                ucana.transferFrom(_to, _from, ucanu.getUmToken2EquivaleQuantosToken1() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANE")) {
                ucane.transferFrom(_to, _from, ucanu.getUmToken2EquivaleQuantosToken3() * amount);
            }
        }
        else if (keccak256(bytes(orig)) == keccak256("UCANE")) {
            ucane.transferFrom(_from, _to, amount * WAD);

            if (keccak256(bytes(dest)) == keccak256("UCANA")) {
                ucana.transferFrom(_to, _from, ucane.getUmToken3EquivaleQuantosToken1() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANU")) {
                ucanu.transferFrom(_to, _from, ucane.getUmToken3EquivaleQuantosToken2() * amount);
            }
        }
        sortPivo();
    }


    // function to give the right price value

    function sortPivo() private {
        uint256 sorted = random(rangeLimit) + 1;

        uint256 equivalencia1 = random(rangeLimit) + 1;
        uint256 equivalencia2 = equivalencia1 + 2;
        uint256 const = 1;

        if (sorted <= 2) {
            // Token1 is the pivo UCANA

            ucana.setUmToken1EquivaleQuantosToken2(equivalencia1 * WAD);
            ucana.setUmToken1EquivaleQuantosToken3(equivalencia2 * WAD);

            ucane.setUmToken3EquivaleQuantosToken1(const.divEly(equivalencia2));
            ucanu.setUmToken2EquivaleQuantosToken1(const.divEly(equivalencia1));

            ucanu.setUmToken2EquivaleQuantosToken3(equivalencia2.divEly(equivalencia1));
            ucane.setUmToken3EquivaleQuantosToken2(equivalencia1.divEly(equivalencia2));
            idPivo = 1;
        } else if (sorted <= 5) {
            // Token2 is the pivo UCANU

            ucanu.setUmToken2EquivaleQuantosToken1(equivalencia1 * WAD);
            ucanu.setUmToken2EquivaleQuantosToken3(equivalencia2 * WAD);

            ucana.setUmToken1EquivaleQuantosToken2(const.divEly(equivalencia1));
            ucane.setUmToken3EquivaleQuantosToken2(const.divEly(equivalencia2));

            ucana.setUmToken1EquivaleQuantosToken3(equivalencia2.divEly(equivalencia1));
            ucane.setUmToken3EquivaleQuantosToken1(equivalencia1.divEly(equivalencia2));
            idPivo = 2;
        } else {
            // Token3 is the pivo UCANE

            ucane.setUmToken3EquivaleQuantosToken1(equivalencia1 * WAD);
            ucane.setUmToken3EquivaleQuantosToken2(equivalencia2 * WAD);

            ucana.setUmToken1EquivaleQuantosToken3(const.divEly(equivalencia1));
            ucanu.setUmToken2EquivaleQuantosToken3(const.divEly(equivalencia2));

            ucana.setUmToken1EquivaleQuantosToken2(equivalencia2.divEly(equivalencia1));
            ucanu.setUmToken2EquivaleQuantosToken1(equivalencia1.divEly(equivalencia2));
            idPivo = 3;
        }
    }

    function getIdPivo() public returns (uint256) {
        return idPivo;
    }

    function random(uint mod) internal returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % mod;
    }

    function helloWorld() public view returns(string memory) {
        return "Ola mundo"; 
    }

    function getBalanceOfToken1() public returns (uint256) {
        return ucana.balanceOfToken(msg.sender);
    }

    function getBalanceOfToken2() public returns (uint256) {
        return ucanu.balanceOfToken(msg.sender);
    }

    function getBalanceOfToken3() public returns (uint256) {
        return ucane.balanceOfToken(msg.sender);
    }

    function getBalanceOfTotal() public returns (uint256) {
        return ucane.balanceOfToken(msg.sender);
    }

    function getRelationOfToken1() public returns (uint256, uint256) {
        return (ucana.getUmToken1EquivaleQuantosToken2(), ucana.getUmToken1EquivaleQuantosToken3());
    }

    function getRelationOfToken2() public returns (uint256, uint256) {
        return (ucanu.getUmToken2EquivaleQuantosToken1(), ucanu.getUmToken2EquivaleQuantosToken3());
    }

    function getRelationOfToken3() public returns (uint256, uint256) {
        return (ucane.getUmToken3EquivaleQuantosToken1(), ucane.getUmToken3EquivaleQuantosToken2());
    }
}