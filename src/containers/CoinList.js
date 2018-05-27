import React, {Component} from 'react';
import axios from 'axios';
import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./Select.css";
import VirtualizedSelect from "react-virtualized-select";

const API = "https://min-api.cryptocompare.com/data/";
const COINLIST = "all/coinlist";

class CoinList extends Component {
  constructor() {
    super();
    this.state = {
      coinList: [], // list of all coins available
      selectValue: [], // coins selected from dropdown
    };
  }

  componentDidMount() {
    // Get list of available coins
    axios.get(API + COINLIST)
      .then(res => {
        const coins = res.data.Data;
        this.setState({coinList: coins});
      })
  }

  render() {
    const data = this.state.coinList;
    if (data == null) return null;

    // List of coins to be displayed by drop-down menu
    const options = Object.keys(data).map(function (k) {
      return {label: data[k].CoinName, value: k};
    });

    return (
      <div className="coin-list">
        <span>
          <VirtualizedSelect
            options={options}
            multi={true}
            removeSelected={true}
            closeOnSelect={false}
            simpleValue={true}
            onChange={(selectValue) => this.setState({ selectValue })}
            value={this.state.selectValue}
        />
        </span>
        <button type="submit"
                onClick={() => {
                  if (this.state.selectValue.length > 0) {
                    // Send selected coins to parent via callback
                    this.props.getSelectedCoins(this.state.selectValue);
                    this.setState({selectValue: []})
                  }
                }}>ADD
        </button>
      </div>
    )
  }
}

export default CoinList;