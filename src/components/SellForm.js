import React, { Component } from 'react';
import tokenLogo from '../token-logo.png';
import ethLogo from '../eth-logo.png';

class SellForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            output: '0'   
        }
    }

  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let etherAmount
            etherAmount = this.input.value.toString()
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            this.props.sellTokens(etherAmount)
            console.log("purchasing tokens...")
            }}>
            <div>
                <label className="float-left"><b>Input</b></label>
                <span className="float-right text-muted">
                    Saldo: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
                </span>
            </div>
            <div className="input-group mb-4">
                <input type="text"
                onChange={(event) => {
                    const tokenAmount = this.input.value.toString()
                    this.setState({
                        output: tokenAmount / 100
                    })
                }}
                ref={(input) => {this.input = input}}
                className="form-control form-control-lg" placeholder="0" required />
                <div className="input-group-append">
                    <div className="input-group-text">
                        &nbsp;
                        <select name="" id="tokenSelect" onChange={(event) => {
                            var tokenSymbol = document.getElementById("tokenSelect");
                            var textSymbol = tokenSymbol.options[tokenSymbol.selectedIndex].text
                        }}
                        style={{fontWeight: 'bold'}}>
                            <option value="">UCN</option>
                            <option value="">INF</option>
                            <option value="">SLI</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <label className="float-left"><b>Output</b></label>
                <span className="float-right text-muted">
                    Saldo: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
                </span>
            </div>
            <div className="input-group mb-2">
                <input type="text" className="form-control form-control-lg" placeholder="0"
                value={this.state.output}
                disabled />
                <div className="input-group-append">
                    <div className="input-group-text" style={{fontWeight: 'bold', fontSize: '20px'}}>
                        &nbsp;&nbsp; ETH
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <span className="float-left text-muted">Taxa de Câmbio</span>
                <span className="float-right text-muted">100 UCAN = 1 ETH</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
        </form>
    );
  }
}

export default SellForm;
