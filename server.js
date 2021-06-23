
require('dotenv').config();
const PORT = 3001;
const IP = '127.0.0.1'
const express= require('express')
const app =express()
const routes = require('./routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient;
const contract = require('truffle-contract');
const artifacts = require('./src/abis/EthSwap.json');
let web3;
app.use(express.json());

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
}
const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)

//console.log("Ola ddssdsd ETH")
//console.log(LMS._json);

mongodb.connect('mongodb://localhost:27017/exchange_api_database',{ useUnifiedTopology: true }, async(err,client)=>{
    const db = client.db('exchange_api_database');
    const accounts = await web3.eth.getAccounts();
    const lms = await LMS.deployed();

    //console.log(accounts);
    //console.log(lms);

    routes(app,db, lms, accounts, web3)
    
    /*app.listen(PORT, () => {
      console.log('listening on port '+ PORT);
      console.log('Your netword 127.0.0.1:'+PORT)
    })*/

    app.listen(PORT, IP, () => {
       console.log('listening on port '+ PORT);
       console.log('Your netword '+IP+':'+PORT)
     })
})
