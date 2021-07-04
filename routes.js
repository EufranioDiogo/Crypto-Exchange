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

const shortid = require('short-id')
const ipfsCliente = require('ipfs-http-client')
const ipfs = ipfsCliente.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const fs = require('fs');
const { parse, stringify } = require('flatted');
//const { RESERVED_EVENTS } = require('socket.io/dist/socket');



function routes(app, dbUsers, lms, accounts, web3) {
    const dbUser = dbUsers.collection('exchange-users')
    const exchange = dbUsers.collection('exchange-store')
    const exchangeAddress = lms.address;

    // @ts-ignore
    const exchangeContractJSON = JSON.parse(fs.readFileSync('./src/abis/EthSwap.json'), 'utf8');
    const exchangeABI = exchangeContractJSON.abi;
    const exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress);

    app.post('/swap', async (req, res) => {
        const idEstudante = req.body.idEstudante;


        dbUser.findOne({ idEstudante: idEstudante }).then((data) => {

            console.log(data);
            const privateKey = req.body.privateKey;

            if (privateKey != data.privateKey) {
                res.status(404).json({
                    "status": "error, not authorized",
                    "message": "error not valid private key"
                })
            } else {
                const origCrypto = String(req.body.orig).toUpperCase(); // UCANU, UCANA, UCANE
                const destCrypto = String(req.body.dest).toUpperCase(); // UCANU, UCANA, UCANE


                const idConta = req.body.idConta;
                const amount = req.body.amount;


                exchangeContract.methods.swap(idConta, exchangeAddress, amount, origCrypto, destCrypto)
                    .send({ from: idConta, gas: "220000" })
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            "message": result
                        })
                    }).catch(function (err) {
                        console.log('err...\n' + err);
                        res.status(200).json({
                            "message": err
                        })
                    })

                if (origCrypto != 'UCANU' && origCrypto != 'UCANA' && origCrypto != 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Orig token not founded"
                    })
                }

                if (destCrypto != 'UCANU' && destCrypto != 'UCANA' && destCrypto != 'UCANE') {
                    res.status(400).json({
                        "status": 400,
                        "message": "Dest token not founded"
                    })
                }

                if (origCrypto == destCrypto) {
                    res.status(400).json({
                        "error": 400,
                        "message": "You can't swap the same cryptos"
                    })
                } else {
                    const idConta = req.body.idConta;
                    const amount = parseInt(req.body.amount);


                    exchangeContract.methods.swap(idConta, exchangeAddress, amount, origCrypto, destCrypto)
                        .send({ from: idConta, value: web3.utils.toWei(amount, "ether"), gas: "220000" })
                        .then((result) => {
                            console.log(result);
                            res.status(200).json({
                                "message": result
                            })
                        }).catch(function (err) {
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



    app.post('/login', (req, res) => {
        let email = req.body.email
        if (email) {
            dbUser.findOne({ email }, (err, doc) => {
                if (doc) {
                    res.json({ "status": "success", "id": doc.id })
                } else {
                    res.status(400).json({ "status": "Failed", "reason": "Not recognised" })
                }
            })
        } else {
            res.status(400).json({ "status": "Failed", "reason": "wrong input" })
        }
    })

    app.post('/upload', async (req, res) => {
        let buffer = req.body.buffer
        let name = req.body.name
        let title = req.body.title
        let id = shortid.generate() + shortid.generate()

        if (buffer && title) {
            let ipfsHash = await ipfs.add(buffer);

            console.log(ipfsHash)

            // let hash = ipfsHash[0].hash
            let hash = ipfsHash.path;


            lms.sendIPFS(id, hash, { from: accounts[0] })
                .then((_hash, _address) => {
                    exchange.insertOne({ id, hash, title, name })
                    res.json({ "status": "success", id })
                })
                .catch(err => {
                    res.status(500).json({ "status": "Failed", "reason": "Upload error occured" })
                })
        } else {
            res.status(400).json({ "status": "Failed", "reason": "wrong input" })
        }
    })

    app.get('/access/:email', (req, res) => {
        if (req.params.email) {
            dbUsers.findOne({ email: req.body.email }).then(data => {
                res.json({ "status": "success", data })
            }).catch((error) => {
                console.log(error);
                res.json({ "status": "error", error })
            })
        } else {
            res.status(400).json({ "status": "Failed", "reason": "wrong input" })
        }
    })

    app.get('/access/:email/:id', (req, res) => {
        const id = req.params.id
        const email = req.params.email;

        if (id && email) {
            dbUsers.findOne({ email: email }).then(data => {
                console.log(accounts);

                lms
                    .getHash(id, { from: accounts[0] })
                    .then(async (hash) => {
                        console.log('hash: ' + hash)
                        let info = await ipfs.files.read(hash)
                        res.json({ "status": "success", info })
                    }).catch((error) => {
                        res.json({ "status": "error", error })
                    })
            }).catch(error => {
                res.status(400).json({ "status": "Failed", "reason": "wrong input" })
            })
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