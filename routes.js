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
//const { RESERVED_EVENTS } = require('socket.io/dist/socket');



function routes(app, dbUsers, lms, accounts, web3) {
    const dbUser = dbUsers.collection('exchange-users')
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
    app.post('/swap', async (req, res) => {
        const idEstudante = req.body.idEstudante;


        dbUser.findOne({ idEstudante: idEstudante }).then(async (data) => {
            const privateKey = req.body.privateKey;

            if (privateKey != data.privateKey) {
                res.status(404).json({
                    "status": "error, not authorized",
                    "message": "error not valid private key"
                })
            } else {
                const origCrypto = String(req.body.orig).toUpperCase(); // UCANU, UCANA, UCANE
                const destCrypto = String(req.body.dest).toUpperCase(); // UCANU, UCANA, UCANE

                if (origCrypto != 'UCANU' && origCrypto != 'UCANA' && origCrypto != 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Orig Token not defined"
                    })
                }

                if (destCrypto != 'UCANU' && destCrypto != 'UCANA' && destCrypto != 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Dest Token not defined"
                    })
                }

                if (origCrypto == destCrypto) {
                    res.status(400).json({
                        "error": 400,
                        "message": "You can't swap the same cryptos"
                    })
                } else {
                    const idConta = req.body.idConta;
                    const amount = req.body.amount; // Passado uma string, exempl: 100 significando 100 unidades da moeda X
    
                    const detailsOfTransfer = {
                        from: idConta,
                        to: exchangeAddress,
                        value: amount
                    }

                    exchangeContract.methods.swap(detailsOfTransfer.to, detailsOfTransfer.from, amount).send(detailsOfTransfer)
                    .then(async (result) => {
                            console.log(result);
    
                            res.status(200).json({
                                "message": result
                            })
                        })
                    .catch(async function (err) {
                        console.log('err...\n' + err);
    
                        res.status(200).json({
                            "message": err
                        })
                    })
                }
            }
        }).catch((error) => {
            res.status(404).json({
                "status": "error",
                "message": "Error user not registred"
            })
        })
    })

    app.get('/balance/:idEstudante', (req, res) => {
        const idEstudante = req.params.idEstudante;
        const privateKey = req.body.privateKey;
        const idConta = req.body.idConta;

        dbUser.findOne({ idEstudante: idEstudante }).then(async (data) => {
            const studentPrivateKey = data.privateKey;

            if (privateKey != studentPrivateKey) {
                res.status(400).response({
                    status: 400,
                    message: 'Error in your authentication'
                })
            } else {
                const balanceToken1 = await exchangeContract.methods.getBalanceOfToken1().call({from: idConta});
                const balanceToken2 = await exchangeContract.methods.getBalanceOfToken1().call({from: idConta});
                const balanceToken3 = await exchangeContract.methods.getBalanceOfToken1().call({from: idConta});

                res.status(200).response({
                    status: 200,
                    message: 'Balances of your account',
                    balances: {
                        ucana: balanceToken1,
                        ucanu: balanceToken2,
                        ucane: balanceToken3 
                    }
                });
            }
        }).catch((error) => {
            res.status(500).response({
                status: 500,
                message: ''
            })
        })
    })




    app.post('/register', (req, res) => {
        const idEstudante = req.body.idEstudante;
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const idConta = req.body.idConta;
        const privateKey = req.body.privateKey;
        const email = req.body.email;

        const user = {
            idEstudante,
            nome,
            sobrenome,
            idConta,
            privateKey,
            email
        }

        if (idEstudante && nome && sobrenome && idConta && privateKey && email) {
            dbUser.findOne({ idEstudante, nome, sobrenome, idConta, privateKey, email })
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



    app.get('/getData', (req, res) => {
        const email = req.body.email

        if (email) {
            dbUser.findOne({ email }).then(data => {
                if (data) {
                    res.status(200).json({
                        "status": 200,
                        "user": data
                    })
                } else {
                    res.status(400).json({ "status": "Failed", "reason": "User does not exist" })
                }
            }).catch(err => {
                res.status(400).json({ "status": "Failed", "error": err })
            });
        } else {
            res.status(400).json({ "status": "Failed", "reason": "wrong input" })
        }
    })
}

module.exports = routes


/*

exchangeContract.methods.helloWorld().call().then((result) => {
            console.log(result);
            res.status(200).json({
                "message": result
            })
        }).catch(function(err){
            console.log('err...\n'+err);
            res.status(200).json({
                "message": err
            })
        });;


        */