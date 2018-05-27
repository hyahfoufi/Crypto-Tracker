import React, {Component} from 'react';
import axios from 'axios';
import PriceBox from '../components/PriceBox';

const API = "https://min-api.cryptocompare.com/data/";
const ENDPOINT_INFO = "coin/generalinfo";
const ENDPOINT_PRICE = "pricemultifull";

// Return appropriate price from object
const getPriceData = (sym, obj, element) => {
  try {
    return obj[sym.sym].USD[element];
  } catch (e) {
    console.log("Prices not loaded yet");
  }
  return 0
};

class CoinData extends Component {
  constructor() {
    super();
    this.state = {
      coinData: [], // contains logo links and full names of coins
      coinPrice: [], // coin prices
    };
  }

  componentDidMount() {
    // Make api calls and set state data
    this.apiPromise(this.props.coinsToShow)
  }

  componentWillReceiveProps(nextProps){
    this.apiPromise(nextProps.coinsToShow);
    localStorage.setItem("coinList", JSON.stringify(nextProps.coinsToShow));
  }

  // Make both API calls to get data and prices before setting the state
  apiPromise(apiAction) {
    Promise.all([this.apiCall(apiAction).getData(), this.apiCall(apiAction).getPrice()])
      .then(([data, prices]) => {
        this.setState({
          coinData: data,
          coinPrice: prices
        });
      })
  }

  // Make api call and get coin data and price
  apiCall(coinsToShow) {
    return {
      getData: () => axios.get(API + ENDPOINT_INFO + "?fsyms=" + coinsToShow + "&tsym=USD")
        .then(res => res.data.Data),
      getPrice: () => axios.get(API + ENDPOINT_PRICE + "?fsyms=" + coinsToShow + "&tsyms=USD")
        .then(res => res.data.DISPLAY)
    }
  }

  render() {
    const data = this.state.coinData;
    const price = this.state.coinPrice;
    if (data == null || price == null) return null;

    return (
      <main>
        {Object.keys(data).map((key) => (
            <PriceBox
              key={key}
              name={data[key].CoinInfo.FullName}
              symbol={data[key].CoinInfo.Name}
              image={"https://www.cryptocompare.com"+data[key].CoinInfo.ImageUrl}
              price={getPriceData( {sym: data[key].CoinInfo.Name}, price, "PRICE")}
              deleteThisCoin={this.props.deleteThisCoin}
            />
        ))}
      </main>
    )
  }
}

export default CoinData;