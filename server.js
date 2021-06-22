
require('dotenv').config();
const PORT = 3000;
const express= require('express')
const app =express()
const routes = require('./routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
const contract = require('truffle-contract');
const artifacts = require('./build/Inbox.json');


app.use(express.json());

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
}
const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)


mongodb.connect('mongodb://localhost:27017/exchange_api_database',{ useUnifiedTopology: true }, async(err,client)=>{
    const db = client.db('exchange_api_database');
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();

    routes(app,db, lms, accounts)
    app.listen(PORT, () => {
       console.log('listening on port '+ PORT);
     })
})