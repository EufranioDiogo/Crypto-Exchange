const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
const { timeStamp } = require('console');
const fs = require('fs');
let requestExchangeBuyOrdersRunning = false;
//const { RESERVED_EVENTS } = require('socket.io/dist/socket');
const buyOrdersMappings = [];
const sellOrdersMappings = [];
let quantTokensUCANATransfered = 0;
let quantTokensUCANUTransfered = 0;
let quantTokensUCANETransfered = 0;
let exchangeMarketTimeStamp = 0;
let timeStampToUpdateExchangeMarketMovimento = 2000;
let accounts = null;
let actualAccountToBeSended = 0;


const exchangeMarketMovement = [];

setInterval(exchangeMarketMovementFunction, timeStampToUpdateExchangeMarketMovimento);

function routes(app, dbUsers, lms, accounts, web3) {
    const dbUser = dbUsers.collection('exchange-users');
    const dbAccounts = dbUsers.collection('accounts-data')
    const exchange = dbUsers.collection('exchange-store')
    accounts = accounts;
    const exchangeAddress = lms.address;
    // @ts-ignore
    const exchangeContractJSON = JSON.parse(fs.readFileSync('./src/abis/EthSwap.json'), 'utf8');
    const exchangeABI = exchangeContractJSON.abi;
    const exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress);

    /* Função responsavel para fazer o uma transação, no caso trocar uma determinada
    quantidade de uma tua crypto moeda por outra com a exchange
    e de realçar que qualquer chamada dela, ela passa por mecanismos de segurança para
    evitar burlas ao sistema, como a verificação da private key, o id do estudante 
    entre outros

    Como chamar:
    rota -> http://127.0.0.1:3001/swap 

    O que passar:
    {
        "idEstudante": "string",
        "idConta": "string, id da conta é fornecido pelo ganache",
        "privateKey": "string também fornecida pelo ganache",
        "orig": "string, pode ser (UCANU, UCANA, UCANE)",
        "dest": "string, pode ser (UCANU, UCANA, UCANE)",
        "amount": "string, definindo o quanto queremos fazer a de transferència, exemplo: 10, significa 10 unidades da moeda origem que pretendes trocar pela moeda destino"
    }
    */
    app.post('/placeOrder', async(req, res) => {
        const idEstudante = req.body.idEstudante;


        dbUser.findOne({ idEstudante: idEstudante }).then(async(data) => {
            const privateKey = req.body.privateKey;

            if (privateKey !== data.privateKey) {
                res.status(404).json({
                    "status": "error, not authorized",
                    "message": "error not valid private key"
                })

                return;
            } else {
                const offeredTokenName = String(req.body.offeredTokenName).toUpperCase(); // UCANU, UCANA, UCANE
                const targetTokenName = String(req.body.targetTokenName).toUpperCase(); // UCANU, UCANA, UCANE
                const quantTokensTarget = String(req.body.quantTokensTarget);
                const quantTokensOffered = String(req.body.quantTokensOffered);
                const orderType = Number.parseInt(req.body.orderType);

                /*
                if (offeredTokenName  !== 'UCANU' || offeredTokenName  !== 'UCANA' || offeredTokenName  !== 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Orig Token not defined"
                    })
                    return;
                }

                if (targetTokenName !== 'UCANU' || targetTokenName !== 'UCANA' || targetTokenName !== 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Dest Token not defined"
                    })
                    return;
                }*/

                const idConta = req.body.idConta;

                const detailsOfTransfer = {
                    from: idConta,
                    gas: 3000000
                }

                try {
                    const returnedValue = await exchangeContract.methods.placeOrder(targetTokenName, quantTokensTarget, offeredTokenName, quantTokensOffered, orderType).send(detailsOfTransfer);
                    let orders;

                    if (orderType === 0) {
                        await updateSellOrdersMappings();
                        orders = await getMySellOrders(idConta);

                    } else {
                        await updateBuyOrdersMappings();
                        orders = await getMyBuyOrders(idConta);
                    }

                    if (offeredTokenName === 'UCANA') {
                        quantTokensUCANATransfered += Number.parseInt(quantTokensOffered);
                    } else if (offeredTokenName === 'UCANU') {
                        quantTokensUCANUTransfered += Number.parseInt(quantTokensOffered);
                    } else {
                        quantTokensUCANETransfered += Number.parseInt(quantTokensOffered);
                    }
                    res.status(200).json({
                        "message": "Order placed",
                        "value": returnedValue.events.placeOrderEvent.returnValues.matchResult,
                        "orders": orders,
                    })

                    return;
                } catch (err) {
                    console.log('err...\n' + err);

                    res.status(200).json({
                        "message": err
                    })
                    return;
                }
            }
        }).catch((error) => {
            res.status(404).json({
                "status": 400,
                "message": error
            })
            return;
        })
    })

    app.get('/balance/:idEstudante', (req, res) => {
        const idEstudante = req.params.idEstudante;
        const privateKey = req.body.privateKey;
        const idConta = req.body.idConta;

        dbUser.findOne({ idEstudante: idEstudante }).then(async(data) => {
            const studentPrivateKey = data.privateKey;

            const balanceToken1 = await exchangeContract.methods.getBalanceOfToken1().call({ from: idConta });
            const balanceToken2 = await exchangeContract.methods.getBalanceOfToken2().call({ from: idConta });
            const balanceToken3 = await exchangeContract.methods.getBalanceOfToken3().call({ from: idConta });

            res.status(200).json({
                status: 200,
                message: 'Balances of your account',
                balances: {
                    ucana: balanceToken1,
                    ucanu: balanceToken2,
                    ucane: balanceToken3
                }
            });
            return;

        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: ''
            })
            return;
        })
    })

    app.post('/register', async(req, res) => {
        const idEstudante = req.body.idEstudante;
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;

        const accountInfo = await getLastValidAccountAvaible();

        const user = {
            idEstudante,
            nome,
            sobrenome,
            idConta: accountInfo.accountID,
            privateKey: accountInfo.privateKey
        }

        if (idEstudante && nome && sobrenome) {
            dbUser.findOne({ idEstudante, nome, sobrenome })
                .then(data => {
                    if (data !== null) {
                        res.status(400).json({
                            "status": 400,
                            "message": "User already exist"
                        });
                    } else {
                        dbUser.insertOne(user);
                        res.status(200).json({
                            "status": 200,
                            "userDetails": user,
                            "createdAt": new Date().getTime()
                        })
                    }
                }).catch(error => {
                    res.status(400).json({
                        "status": 400,
                        "message": error
                    });
                })
        } else {
            res.status(400).json({ "status": "Failed", "reason": "wrong input" })
        }
    })


    app.post('/accounts', (req, res) => {
        /*const idEstudante = req.body.idEstudante;
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const idConta = req.body.idConta;
        const privateKey = req.body.privateKey;

        if (privateKeys.length == accounts.length) {
            for (let i = 0; i < accounts.length; i++) {
                dbAccounts.insertOne({
                    accountID: accounts[i],
                    privateKey: privateKeys[i],
                    used: false
                });
            }
        } else {
            console.log("Not equal");
        }


        res.status(200).json({
            "status": 200,
        })*/
        res.status(200).json({
            "status": 200,
        })
    })

    app.get('/exchange', (req, res) => {
        const idEstudante = req.body.idEstudante;

        dbUser.findOne({ idEstudante: idEstudante }).then(async(data) => {
            const relationsToken1 = {
                relations: await exchangeContract.methods.getRelationOfToken1().call(),
            }
            let tokenAtoU = relationsToken1.relations['0'];
            let tokenAtoE = relationsToken1.relations['1'];

            const relationsToken2 = {
                relations: await exchangeContract.methods.getRelationOfToken2().call(),
            }

            let tokenUtoA = relationsToken2.relations['0'];
            let tokenUtoE = relationsToken2.relations['1'];


            const relationsToken3 = {
                relations: await exchangeContract.methods.getRelationOfToken3().call(),
            }


            let tokenEtoA = relationsToken3.relations['0'];
            let tokenEtoU = relationsToken3.relations['1'];


            const pivo = await exchangeContract.methods.getIdPivo().call();
            let pivoName = pivo;

            res.status(200).json({
                status: 200,
                message: 'Balances of Exchange',
                balances: {
                    ucana: {
                        ucane: tokenAtoE,
                        ucanu: tokenAtoU
                    },
                    ucanu: {
                        ucana: tokenUtoA,
                        ucane: tokenUtoE
                    },
                    ucane: {
                        ucana: tokenEtoA,
                        ucanu: tokenEtoU
                    }
                }
            });
            return;
        }).catch((error) => {
            res.status(500).json({
                status: 500,
                message: ''
            })
            return;
        })
    })

    app.get('/getBuyOrders', (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'Buy orders Mappings',
            buyOrders: buyOrdersMappings,
        });
        return;
    })

    app.get('/getSellOrders', (req, res) => {
        res.status(200).json({
            status: 200,
            message: 'Sell orders Mappings',
            sellOrders: sellOrdersMappings,
        });
        return;
    })

    app.get('/getBuyOrders/:idConta', (req, res) => {
        const idConta = req.params.idConta;
        const privateKey = req.body.privateKey;

        dbUser.findOne({ idConta: idConta }).then(async(data) => {
            if (data.privateKey === privateKey) {
                const myBuyOrders = await getMyBuyOrders(idConta);


                res.status(200).json({
                    status: 200,
                    message: 'My Buy orders Mappings',
                    buyOrders: myBuyOrders,
                });
                return;
            } else {
                res.status(200).json({
                    status: 200,
                    message: 'Not authorized Transaction'
                });
                return;
            }

        }).catch(err => res.status(400).json({
            status: 200,
            message: "Account not founded"
        }))
    });

    app.get('/getSellOrders/:idConta', (req, res) => {
        const idConta = req.params.idConta;
        const privateKey = req.body.privateKey;

        dbUser.findOne({ idConta: idConta }).then(async(data) => {
            if (data.privateKey === privateKey) {
                const mySellOrders = await getMySellOrders();


                res.status(200).json({
                    status: 200,
                    message: 'My Sell orders Mappings',
                    sellOrders: mySellOrders,
                });
                return;
            } else {
                res.status(200).json({
                    status: 200,
                    message: 'Not authorized Transaction'
                });
                return;
            }

        }).catch(err => res.status(400).json({
            status: 200,
            message: "Account not founded"
        }))
    });


    app.get('/stockExchange', (req, res) => {
        const idEstudante = req.body.idEstudante;

        dbUser.findOne({ idEstudante: idEstudante }).then(async(data) => {
            const totalUCANA = await exchangeContract.methods.getTotalValorNaBolsaUCANA().call();
            const totalUCANU = await exchangeContract.methods.getTotalValorNaBolsaUCANU().call();
            const totalUCANE = await exchangeContract.methods.getTotalValorNaBolsaUCANE().call();
            return res.status(200).json({
                status: 200,
                message: 'Balances of Exchange',
                balances: {
                    ucana: totalUCANA,
                    ucanu: totalUCANU,
                    ucane: totalUCANE
                }
            });
        }).catch((error) =>
            res.status(500).json({
                status: 500,
                message: error
            })
        )
    })

    app.get('/students', async(req, res) => {
        try {
            const data = await dbUser.find({}).toArray();

            for (let i = 0; i < data.length; i++) {
                const totalBalanceInfo = await exchangeContract.methods.getBalanceInfo().call({
                    from: data[i].idConta
                });
                console.log(totalBalanceInfo)
                data[i].ucana = totalBalanceInfo['2'];
                data[i].ucanu = totalBalanceInfo['1'];
                data[i].ucane = totalBalanceInfo['3'];
                data[i].patrimonio = totalBalanceInfo['0'];
            }


            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error
            })
        }
    })

    app.get('/exchangeMarketMoviment', async(req, res) => {
        return res.status(200).json({
            exchangeMarketMovement
        });
    })


    async function getMySellOrders(accountID) {
        const mySellOrders = [];

        mySellOrders.splice(0, mySellOrders.length);
        let index = 0;
        let quantSellOrders = await exchangeContract.methods.getSellOrdersSize().call({ from: exchangeAddress });
        let order;

        while (quantSellOrders != 0) {
            order = await exchangeContract.methods.getMySellOrder(index).call({ from: accountID });

            if (order.id != -1) {
                mySellOrders.push({
                    id: order.id,
                    owner: order.owner,
                    targetTokenName: order.targetTokenName,
                    quantTokensTarget: order.quantTokensTarget,
                    offeredTokenName: order.offeredTokenName,
                    quantTokensOffered: order.quantTokensOffered,
                    isCompleted: order.isCompleted
                });
            }


            index++;
            quantSellOrders -= 1;
        }
        return mySellOrders;
    }

    async function getMyBuyOrders(accountID) {
        const myBuyOrders = [];

        myBuyOrders.splice(0, myBuyOrders.length);
        let index = 0;
        let quantBuyOrders = await exchangeContract.methods.getBuyOrdersSize().call({ from: exchangeAddress });
        let order;

        while (quantBuyOrders != 0) {
            order = await exchangeContract.methods.getMyBuyOrder(index).call({ from: accountID });

            if (order.id != -1) {
                myBuyOrders.push({
                    id: order.id,
                    owner: order.owner,
                    targetTokenName: order.targetTokenName,
                    quantTokensTarget: order.quantTokensTarget,
                    offeredTokenName: order.offeredTokenName,
                    quantTokensOffered: order.quantTokensOffered,
                    isCompleted: order.isCompleted
                });
            }

            index++;
            quantBuyOrders -= 1;
        }
        return myBuyOrders;
    }

    async function updateSellOrdersMappings() {
        sellOrdersMappings.splice(0, sellOrdersMappings.length);
        let index = 0;
        let quantSellOrders = await exchangeContract.methods.getSellOrdersSize().call({ from: exchangeAddress });
        let order;

        while (quantSellOrders) {
            order = await exchangeContract.methods.getSellOrder(index).call({ from: exchangeAddress });
            sellOrdersMappings.push({
                id: order.id,
                owner: order.owner,
                targetTokenName: order.targetTokenName,
                quantTokensTarget: order.quantTokensTarget,
                offeredTokenName: order.offeredTokenName,
                quantTokensOffered: order.quantTokensOffered,
                isCompleted: order.isCompleted
            });

            index++;
            quantSellOrders -= 1;
        }
    }

    async function updateBuyOrdersMappings() {
        buyOrdersMappings.splice(0, buyOrdersMappings.length);
        let index = 0;
        let quantBuyOrders = await exchangeContract.methods.getBuyOrdersSize().call({ from: exchangeAddress });
        let order;

        while (quantBuyOrders) {
            order = await exchangeContract.methods.getBuyOrder(index).call({ from: exchangeAddress });
            buyOrdersMappings.push({
                id: order.id,
                owner: order.owner,
                targetTokenName: order.targetTokenName,
                quantTokensTarget: order.quantTokensTarget,
                offeredTokenName: order.offeredTokenName,
                quantTokensOffered: order.quantTokensOffered,
                isCompleted: order.isCompleted
            });

            index++;
            quantBuyOrders -= 1;
        }
    }

    async function getLastValidAccountAvaible() {
        const accounts = await dbAccounts.find({}).toArray();
        let i = 0;

        while (i < accounts.length) {
            if (accounts[i].used == false) {
                dbAccounts.update({ accountID: accounts[i].accountID }, {
                    accountID: accounts[i].accountID,
                    privateKey: accounts[i].privateKey,
                    used: true
                })
                return accounts[i];
            }
            i++;
        }
    }
}

module.exports = routes;

function exchangeMarketMovementFunction() {
    exchangeMarketTimeStamp += timeStampToUpdateExchangeMarketMovimento;

    if (exchangeMarketMovement.length > 30)
        exchangeMarketMovement.shift()

    exchangeMarketMovement.push({
        x: exchangeMarketTimeStamp,
        'ucanaTransactedAmount': quantTokensUCANATransfered,
        'ucanuTransactedAmount': quantTokensUCANUTransfered,
        'ucaneTransactedAmount': quantTokensUCANETransfered,
    })



    quantTokensUCANATransfered = 0;
    quantTokensUCANUTransfered = 0;
    quantTokensUCANETransfered = 0;
}