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
const fs = require('fs');
const { restart } = require('nodemon');
let requestExchangeBuyOrdersRunning = false;
//const { RESERVED_EVENTS } = require('socket.io/dist/socket');



function routes(app, dbUsers, lms, accounts, web3) {
    const dbUser = dbUsers.collection('exchange-users');
    const exchange = dbUsers.collection('exchange-store')
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

            if (privateKey != data.privateKey) {
                res.status(404).json({
                    "status": "error, not authorized",
                    "message": "error not valid private key"
                })
                return;
            } else {
                const offeredTokenName = String(req.body.orig).toUpperCase(); // UCANU, UCANA, UCANE
                const targetTokenName = String(req.body.dest).toUpperCase(); // UCANU, UCANA, UCANE
                const quantTokensTarget = String(req.body.quantTokensTarget);
                const quantTokensOffered = String(req.body.quantTokensOffered);
                const orderType = Number.parseInt(req.body.orderType);

                /*
                if (offeredTokenName  != 'UCANU' || offeredTokenName  != 'UCANA' || offeredTokenName  != 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Orig Token not defined"
                    })
                    return;
                }

                if (targetTokenName != 'UCANU' || targetTokenName != 'UCANA' || targetTokenName != 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Dest Token not defined"
                    })
                    return;
                }
*/
                const idConta = req.body.idConta;
                const amount = req.body.amount; // Passado uma string, exempl: 100 significando 100 unidades da moeda X

                const detailsOfTransfer = {
                    from: idConta,
                    gas: 3000000
                }

                try {
                    const returnedValue = await exchangeContract.methods.placeOrder(targetTokenName, quantTokensTarget, offeredTokenName, quantTokensOffered, orderType).send(detailsOfTransfer);

                    console.log(returnedValue)
                        //console.log(returnedValue.events.placeOrderEvent.returnValues)
                    res.status(200).json({
                        "message": "Order placed",
                        "value": returnedValue.events.placeOrderEvent.returnValues.matchResult

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

    app.post('/register', (req, res) => {
        const idEstudante = req.body.idEstudante;
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const idConta = req.body.idConta;
        const privateKey = req.body.privateKey;

        const user = {
            idEstudante,
            nome,
            sobrenome,
            idConta,
            privateKey
        }

        if (idEstudante && nome && sobrenome && idConta && privateKey) {
            dbUser.findOne({ idEstudante, nome, sobrenome, idConta, privateKey })
                .then(data => {
                    if (data != null) {
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
                pivoName: pivoName,
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
        requestExchangeBuyOrdersRunning = true;
        const idEstudante = req.params.idEstudante;
        const privateKey = req.body.privateKey;
        const idConta = req.body.idConta;

        dbUser.findOne({ idEstudante: idEstudante }).then(async(data) => {
            const studentPrivateKey = data.privateKey;

            const buyOrders = await exchangeContract.methods.getBuyOrders().call({ from: idConta });
            const sellOrders = await exchangeContract.methods.getSellOrders().call({ from: idConta });

            res.status(200).json({
                status: 200,
                message: 'Balances of your account',
                balances: {
                    buyOrders: buyOrders,
                    sellOrders: sellOrders
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
    app.get('/stockExchange', (req, res) => {
        const idEstudante = req.body.idEstudante;

        dbUser.findOne({ idEstudante: idEstudante }).then(async(data) => {
            const totalUCANA = await exchangeContract.methods.getTotalValorNaBolsaUCANA().call();
            const totalUCANU = await exchangeContract.methods.getTotalValorNaBolsaUCANU().call();
            const totalUCANE = await exchangeContract.methods.getTotalValorNaBolsaUCANE().call();

            res.status(200).json({
                status: 200,
                message: 'Balances of Exchange',
                balances: {
                    ucana: totalUCANA,
                    ucanu: totalUCANU,
                    ucane: totalUCANE
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

    app.get('/students', async(req, res) => {
        const data = await dbUsers.collection('exchange-users').findAll();

        return res.status(200).send(data);
    })
}

module.exports = routes