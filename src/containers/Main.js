import React, {Component} from 'react';
import CoinList from './CoinList';
import CoinData from './CoinData.js';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      coinsToShow: ["BTC","LTC","ETH","XRP","XLM","ADA"]
    };
  }

  // Display newly selected coins
  getSelectedCoins = (val) => {
    const newArray = this.state.coinsToShow.concat(val.split(','));
    this.setState({
      coinsToShow: newArray
    });

  };

  // If a list of coins is stored in local storage, use it
  componentDidMount() {
    const coinList = JSON.parse(localStorage.getItem("coinList"));
    if (coinList) {
      this.setState({coinsToShow: coinList});
    }
  }

  // Remove coins to be deleted from state
  deleteThisCoin = (val) => {
    const newArray = this.state.coinsToShow.filter(item => item !== val);
    this.setState({
      coinsToShow: newArray
    });
  };

  render() {
    return (
      <div>
        <CoinList getSelectedCoins={this.getSelectedCoins} />
        <CoinData coinsToShow={this.state.coinsToShow} deleteThisCoin={this.deleteThisCoin} />
      </div>
    );
  }
}

export default Main;