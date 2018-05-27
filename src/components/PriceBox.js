import React, {Component} from 'react';

class PriceBox extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState({isHovering: !this.state.isHovering});
  }

  render() {
    return (
      // Display single box with appropriate coin data
      <article onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
        {this.state.isHovering && <div className='x' onClick={
          () => this.props.deleteThisCoin(this.props.symbol)
        }> </div>}
        <figure className='coin-image'><img src={this.props.image} alt={this.props.name} /></figure>
        <div className='coin-name'>{this.props.name}<br/>{this.props.symbol}</div>
        <div className="coin-price">{this.props.price}</div>
      </article>
    )
  }
}

export default PriceBox;