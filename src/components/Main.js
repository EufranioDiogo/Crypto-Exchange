import React, { Component } from 'react';
import BuyForm from './BuyForm'
import SellForm from './SellForm'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentForm: 'buy'   
        }
    }

  render() {
    let content
    if (this.state.currentForm === 'buy'){
        content = <BuyForm ethBalance={this.props.ethBalance}
                    tokenBalance={this.props.tokenBalance}
                    tokenBalance1={this.props.tokenBalance1}
                    tokenBalance2={this.props.tokenBalance2}
                    tokenBalance3={this.props.tokenBalance3}
                    buyTokens={this.props.buyTokens}/>
    } else {
        content = <SellForm ethBalance={this.props.ethBalance}
                    tokenBalance={this.props.tokenBalance}
                    tokenBalance1={this.props.tokenBalance1}
                    tokenBalance2={this.props.tokenBalance2}
                    tokenBalance3={this.props.tokenBalance3}
                    sellTokens={this.props.sellTokens}/>
    }
    return (
      <div id="content" className="mt-3">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-light" onClick={(event) => {
                this.setState({currentForm: 'buy'})
            }}>
                Buy
            </button>
            <span className="text-muted" style={{fontSize: '18px'}}>&lt;-- &nbsp; --&gt;</span>
            <button className="btn btn-light" onClick={(event) => {
                this.setState({currentForm: 'sell'})
            }}>
                Sell
            </button>
          </div>
        <div className="card mb-4">
            <div className="card-body">
                {content}
            </div>
        </div>
      </div>
    );
  }
}

export default Main;
