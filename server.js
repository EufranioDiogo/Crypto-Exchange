require('dotenv').config();
const PORT = 3001;
//const IP = '192.168.0.1';
const IP = '127.0.0.1'
const express = require('express')
const app = express()
const routes = require('./routes')
const Web3 = require('web3');
const base32 = require('base32');
const mongodb = require('mongodb').MongoClient;
const contract = require('truffle-contract');
const artifacts = require('./src/abis/EthSwap.json');
const cors = require('cors');
const { WbIridescentTwoTone } = require('@material-ui/icons');

let web3;
app.use(express.json());
app.use(cors());

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
}
const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)

mongodb.connect('mongodb://localhost:27017/exchange_api_database', { useUnifiedTopology: true }, async(err, client) => {
    const db = client.db('exchange_api_database');
    const accounts = await web3.eth.getAccounts();

    const lms = await LMS.deployed();
    routes(app, db, lms, accounts, web3);


    app.listen(PORT, IP, () => {
        console.log('listening on port ' + PORT);
        console.log('Your netword ' + IP + ':' + PORT)
    });
})