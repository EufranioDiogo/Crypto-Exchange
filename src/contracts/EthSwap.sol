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
    uint256 constant WAD = 10**18;
    uint rangeLimit = 10;
    address public owner;
    mapping(address => uint256) public balanceOfToken1;
    string public pivoName = "";


    constructor(Token _token, Token2 _ucanu, Token3 _ucane) public
    {
        ucana = _token;
        ucanu = _ucanu;
        ucane = _ucane;
        owner = msg.sender;
    }

    /*
    
    */
    function swap(address _from, address _to, uint256 amount, string memory orig, string memory dest) public payable {
        if (keccak256(bytes(orig)) == keccak256("UCANA")) {
            require(ucana.balanceOf(_from) >= amount * WAD);

            ucana.transferFrom(_from, _to, amount * WAD);
//
            if (keccak256(bytes(dest)) == keccak256("UCANU")) {
                ucanu.transferFrom(_to, _from, ucana.getUmToken1EquivaleQuantosToken2() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANE")) {
                ucane.transferFrom(_to, _from, ucana.getUmToken1EquivaleQuantosToken3() * amount);
            }
        } else if (keccak256(bytes(orig)) == keccak256("UCANU")) {
            require(ucanu.balanceOf(_from) >= amount * WAD);

            ucanu.transferFrom(_from, _to, amount * WAD);
//
            if (keccak256(bytes(dest)) == keccak256("UCANA")) {
                ucana.transferFrom(_to, _from, ucanu.getUmToken2EquivaleQuantosToken1() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANE")) {
                ucane.transferFrom(_to, _from, ucanu.getUmToken2EquivaleQuantosToken3() * amount);
            }
        } else if (keccak256(bytes(orig)) == keccak256("UCANE")) {
            require(ucane.balanceOf(_from) >= amount * WAD);
            ucane.transferFrom(_from, _to, amount * WAD);
//
            if (keccak256(bytes(dest)) == keccak256("UCANU")) {
                ucanu.transferFrom(_to, _from, ucane.getUmToken3EquivaleQuantosToken2() * amount);
            } else if (keccak256(bytes(dest)) == keccak256("UCANA")) {
                ucana.transferFrom(_to, _from, ucane.getUmToken3EquivaleQuantosToken1() * amount);
            }
        }


        if (keccak256(bytes(pivoName)) == keccak256("UCANA")) {
            uint256 ucanuToUcana = ucanu.getUmToken2EquivaleQuantosToken1() * (this.getTotalValorNaBolsaUCANU() / WAD);
            uint256 ucaneToUcana = ucane.getUmToken3EquivaleQuantosToken1() * (this.getTotalValorNaBolsaUCANE() / WAD);
            uint256 totalUcana = this.getTotalValorNaBolsaUCANA();

            if (ucaneToUcana > totalUcana) {
                pivoName = "UCANE";
                setNewPivo(pivoName);
            } else if (ucanuToUcana > totalUcana) {
                pivoName = "UCANU";
                setNewPivo(pivoName);
            }
        } else if (keccak256(bytes(pivoName)) == keccak256("UCANU")) {
            uint256 ucanaToUcanu = ucana.getUmToken1EquivaleQuantosToken2() * (this.getTotalValorNaBolsaUCANA() / WAD);
            uint256 ucaneToUcanu = ucane.getUmToken3EquivaleQuantosToken2() * (this.getTotalValorNaBolsaUCANE() / WAD);
            uint256 totalUcanu = this.getTotalValorNaBolsaUCANU();

            if (ucanaToUcanu > totalUcanu) { /*    
                

                if (origCrypto == destCrypto) {
                    res.status(400).json({
                        "error": 400,
                        "message": "You can't swap the same cryptos"
                    })
                } else {
                    
                }*/
                pivoName = "UCANA";
                setNewPivo(pivoName);
            } else if (ucaneToUcanu > totalUcanu) {
                pivoName = "UCANE";
                setNewPivo(pivoName);
            }
        } else if (keccak256(bytes(pivoName)) == keccak256("UCANE")) {
            uint256 ucanaToUcane = ucana.getUmToken1EquivaleQuantosToken3() * (this.getTotalValorNaBolsaUCANA() / WAD);
            uint256 ucanuToUcane = ucanu.getUmToken2EquivaleQuantosToken3() * (this.getTotalValorNaBolsaUCANU() / WAD);
            uint256 totalUcane = this.getTotalValorNaBolsaUCANE();

            if (ucanaToUcane > totalUcane) {
                pivoName = "UCANA";
                setNewPivo(pivoName);
            } else if (ucanuToUcane > totalUcane) {
                pivoName = "UCANU";
                setNewPivo(pivoName);
            }
        }
    }




 
    function getIdPivo() public returns (string memory) {
        return pivoName;
    }

    function random(uint mod) internal returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % mod;
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


    function getRelationOfToken1() public returns (uint256, uint256) {
        return (ucana.getUmToken1EquivaleQuantosToken2(), ucana.getUmToken1EquivaleQuantosToken3());
    }

    function getRelationOfToken2() public returns (uint256, uint256) {
        return (ucanu.getUmToken2EquivaleQuantosToken1(), ucanu.getUmToken2EquivaleQuantosToken3());
    }

    function getRelationOfToken3() public returns (uint256, uint256) {
        return (ucane.getUmToken3EquivaleQuantosToken1(), ucane.getUmToken3EquivaleQuantosToken2());
    }

    function sortInitialPivo() public {
        int totalUcana = int(this.getTotalValorNaBolsaUCANA()); // M1
        int totalUcane = int(this.getTotalValorNaBolsaUCANE()); // M2
        int totalUcanu = int(this.getTotalValorNaBolsaUCANU()); // M3

        if (totalUcana < totalUcane && totalUcana < totalUcanu) {
            pivoName = "UCANA";
        }
        else if (totalUcane <= totalUcanu) {
            pivoName = "UCANE";
        }
        else {
            pivoName = "UCANU";
        }
        setNewPivo(pivoName);
    }


    function setNewPivo(string memory pivo) public {
        uint256 const = 1;
        uint256 equivalencia1 = random(rangeLimit) + 2;
        uint256 equivalencia2 = equivalencia1 + 2;

        if (keccak256(bytes(pivo)) == keccak256("UCANA")) {
            ucana.setUmToken1EquivaleQuantosToken2(equivalencia1 * WAD);
            ucana.setUmToken1EquivaleQuantosToken3(equivalencia2 * WAD);

            ucane.setUmToken3EquivaleQuantosToken1(const.divEly(equivalencia2));
            ucanu.setUmToken2EquivaleQuantosToken1(const.divEly(equivalencia1));

            ucanu.setUmToken2EquivaleQuantosToken3(equivalencia2.divEly(equivalencia1));
            ucane.setUmToken3EquivaleQuantosToken2(equivalencia1.divEly(equivalencia2));
        } else if (keccak256(bytes(pivo)) == keccak256("UCANU")) {
            ucanu.setUmToken2EquivaleQuantosToken1(equivalencia1 * WAD);
            ucanu.setUmToken2EquivaleQuantosToken3(equivalencia2 * WAD);

            ucana.setUmToken1EquivaleQuantosToken2(const.divEly(equivalencia1));
            ucane.setUmToken3EquivaleQuantosToken2(const.divEly(equivalencia2));

            ucana.setUmToken1EquivaleQuantosToken3(equivalencia2.divEly(equivalencia1));
            ucane.setUmToken3EquivaleQuantosToken1(equivalencia1.divEly(equivalencia2));
        } else {
            ucane.setUmToken3EquivaleQuantosToken1(equivalencia1 * WAD);
            ucane.setUmToken3EquivaleQuantosToken2(equivalencia2 * WAD);

            ucana.setUmToken1EquivaleQuantosToken3(const.divEly(equivalencia1));
            ucanu.setUmToken2EquivaleQuantosToken3(const.divEly(equivalencia2));

            ucana.setUmToken1EquivaleQuantosToken2(equivalencia2.divEly(equivalencia1));
            ucanu.setUmToken2EquivaleQuantosToken1(equivalencia1.divEly(equivalencia2));
        }
    }

    function getTotalValorNaBolsaUCANA() public returns (uint256)
    {
        return  ucana.balanceOf(address(this));
    }

    function getTotalValorNaBolsaUCANU() public returns (uint256)
    {
        return  ucanu.balanceOf(address(this));
    }
    function getTotalValorNaBolsaUCANE() public returns (uint256)
    {
        return  ucane.balanceOf(address(this));
    }
}