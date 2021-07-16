//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

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
    string public pivoName = "";
    bool isFirstOrderPlaced = true;

    struct Order {
        address owner;
        string targetTokenName;
        uint quantTokensTarget;
        string offeredTokenName;
        uint quantTokensOffered;
        bool isCompleted;
    }
    uint sizeBuyOrders = 0;
    uint sizeSellOrders = 0;
    mapping(uint => Order) public buyOrders;
    mapping(uint => Order) public sellOrders;
    uint indexOfBuyOrdersToShow = 0;
    uint indexOfSellOrdersToShow = 0;

    event placeOrderEvent(bool matchResult);

    constructor(Token _token, Token2 _ucanu, Token3 _ucane) public
    {
        ucana = _token;
        ucanu = _ucanu;
        ucane = _ucane;
        owner = msg.sender;
    }


    function placeOrder(string memory _targetTokenName, uint _quantTokensTarget, string memory _offeredTokenName, uint _quantTokensOffered, uint _orderType) public {
        Order memory newOrder = Order(msg.sender, _targetTokenName, _quantTokensTarget, _offeredTokenName, _quantTokensOffered, false);

        if (_orderType == 0) {
            sellOrders[sizeSellOrders] = newOrder;
            sizeSellOrders++;
        } else {
            buyOrders[sizeBuyOrders] = newOrder;
            sizeBuyOrders++;
        }

        emit placeOrderEvent(checkMatches());
    }

    function checkMatches() public returns (bool) {
        uint i = 0;
        uint j = 0;

        for (; i < sizeBuyOrders; i++) {
            if (!buyOrders[i].isCompleted) {
                for (j = 0; j < sizeSellOrders; j++) {
                    if (!sellOrders[j].isCompleted) {
                        if (keccak256(bytes(buyOrders[i].targetTokenName)) == keccak256(bytes(sellOrders[j].offeredTokenName)) && keccak256(bytes(buyOrders[i].offeredTokenName)) == keccak256(bytes(sellOrders[j].targetTokenName))) {
                            if (buyOrders[i].quantTokensOffered >= sellOrders[j].quantTokensTarget && buyOrders[i].quantTokensTarget <= sellOrders[j].quantTokensOffered) {
                                swap(buyOrders[i].owner, sellOrders[j].owner, buyOrders[i].quantTokensOffered, buyOrders[i].offeredTokenName);

                                swap(sellOrders[j].owner, buyOrders[i].owner, sellOrders[j].quantTokensOffered, sellOrders[j].offeredTokenName);

                                buyOrders[i].isCompleted = true;
                                sellOrders[j].isCompleted = true;

                                return true;
                                /*return ("Buyer: " + buyOrders[i].owner + "\nOffered Token: " + buyOrders[i].offeredTokenName + "\nQuant Token: " + buyOrders[i].quantTokensOffered + "\nTarget Token: " + sellOrders[j].offeredTokenName + "\nQuant Token: " + sellOrders[j].quantTokensOffered  + "\nSeller: " + sellOrders[j].owner,
                                "Seller: " + sellOrders[j].owner + "\nOffered Token: " + sellOrders[j].offeredTokenName + "\nQuant Token: " + sellOrders[j].quantTokensOffered + "\nTarget Token: " + buyOrders[i].offeredTokenName + "\nQuant Token: " + buyOrders[i].quantTokensOffered  + "\nBuyer: " + buyOrders[i].owner
                                );*/
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    function swap(address _from, address _to, uint256 amount, string memory tokenName) public payable {
        if (keccak256(bytes(tokenName)) == keccak256("UCANA")) {
            require(ucana.balanceOf(_from) >= amount * WAD, "Not enough01 Ether provided.");

            ucana.transferFrom(_from, _to, amount * WAD);
        } else if (keccak256(bytes(tokenName)) == keccak256("UCANU")) {
            require(ucanu.balanceOf(_from) >= amount * WAD, "Not enough02 Ether provided.");

            ucanu.transferFrom(_from, _to, amount * WAD);
        } else if (keccak256(bytes(tokenName)) == keccak256("UCANE")) {
            require(ucane.balanceOf(_from) >= amount * WAD, "Not enough03 Ether provided.");

            ucane.transferFrom(_from, _to, amount * WAD);
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

    function getBuyOrders() public returns (address owner, string memory targetTokenName, uint quantTokensTarget, string memory offeredTokenName, uint quantTokensOffered, bool isCompleted) {
        Order memory orderSelected = buyOrders[indexOfBuyOrdersToShow];


        if (indexOfBuyOrdersToShow < getBuyOrdersSize()) {
            return (orderSelected.owner, orderSelected.targetTokenName, orderSelected.quantTokensTarget, orderSelected.offeredTokenName, orderSelected.quantTokensOffered, orderSelected.isCompleted);
        }
        indexOfBuyOrdersToShow = 0;
        return (orderSelected.owner, orderSelected.targetTokenName, orderSelected.quantTokensTarget, orderSelected.offeredTokenName, orderSelected.quantTokensOffered, orderSelected.isCompleted);
    }

    function getSellOrders() public returns (address owner, string memory targetTokenName, uint quantTokensTarget, string memory offeredTokenName, uint quantTokensOffered, bool isCompleted) {
        Order memory orderSelected = buyOrders[indexOfSellOrdersToShow];


        if (indexOfSellOrdersToShow < getSellOrdersSize()) {
            return (orderSelected.owner, orderSelected.targetTokenName, orderSelected.quantTokensTarget, orderSelected.offeredTokenName, orderSelected.quantTokensOffered, orderSelected.isCompleted);
        }
        indexOfSellOrdersToShow = 0;
        return (orderSelected.owner, orderSelected.targetTokenName, orderSelected.quantTokensTarget, orderSelected.offeredTokenName, orderSelected.quantTokensOffered, orderSelected.isCompleted);
    }


    function getBuyOrdersSize() public returns (uint) {
        return sizeSellOrders;
    }

    function getSellOrdersSize() public returns (uint) {
        return sizeSellOrders;
    }
}