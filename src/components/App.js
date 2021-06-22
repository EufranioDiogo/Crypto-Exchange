import React, { Component } from 'react';
import Web3 from 'web3'
import Token from '../abis/Token.json'
import Token2 from '../abis/Token2.json'
import Token3 from '../abis/Token3.json'
import EthSwap from '../abis/EthSwap.json'
import Navbar from './Navbar'
import Main from './Main'

import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance})
    
    // Load Token
    const networkId = await web3.eth.net.getId()
    const tokenData1 = Token.networks[networkId]
    const tokenData2 = Token2.networks[networkId]
    const tokenData3 = Token3.networks[networkId]

    if (tokenData1) {
      const tokens = [
        new web3.eth.Contract(Token.abi, tokenData1.address),
        new web3.eth.Contract(Token2.abi, tokenData2.address),
        new web3.eth.Contract(Token3.abi, tokenData3.address)
      ]

      const token = new web3.eth.Contract(Token.abi, tokenData1.address)
      this.setState({token})
      
      this.setState({token1: tokens[0]});
      this.setState({token2: tokens[1]});
      this.setState({token3: tokens[2]});

      const tokensBalance = [
        await tokens[0].methods.balanceOf(this.state.account).call(),
        await tokens[1].methods.balanceOf(this.state.account).call(),
        await tokens[2].methods.balanceOf(this.state.account).call()
      ];

      let tokenBalance = await token.methods.balanceOf(this.state.account).call()

      this.setState({tokenBalance: tokenBalance.toString()})

      this.setState({tokenBalance1: tokensBalance[0].toString()});
      this.setState({tokenBalance2: tokensBalance[1].toString()});
      this.setState({tokenBalance3: tokensBalance[2].toString()});

    } else {
      window.alert('Token contract not deployed to detected network.')
    }
    
    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if (tokenData1) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ethSwap})
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
    }

    this.setState({loading: false})
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  buyTokens = (etherAmount) => {
    this.setState({loading: true});

    this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({loading: false})
    })
  }

  sellTokens = (tokenAmount) => {
    this.setState({loading: true})

    this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.state.ethSwap.methods.sellTokens(tokenAmount).send({from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading: false})
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      token: {},
      token1: {},
      token2: {},
      token3: {},
      ethSwap: {},
      ethBalance: '0',
      tokenBalance: '0',
      tokenBalance1: '0',
      tokenBalance2: '0',
      tokenBalance3: '0',
      loading: true
    };
  }

  render() {
    let content
    let loading = false
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main ethBalance={this.state.ethBalance} 
                tokenBalance={this.state.tokenBalance}
                tokenBalance1={this.state.tokenBalance1}
                tokenBalance2={this.state.tokenBalance2}
                tokenBalance3={this.state.tokenBalance3}
                buyTokens={this.buyTokens}
                sellTokens={this.sellTokens}/>
    }

    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '630px'}}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
