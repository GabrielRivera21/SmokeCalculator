import React from 'react';
import ReactDOM from 'react-dom';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange = (e) => {
    this.props.sendText(this.refs.inputNode.value);
  }
  render() {
    return (
      <input
        ref='inputNode'
        type='number'
        value={this.props.value}
        onChange={this.handleChange} />
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      startAge: 10,
      finishedAge: 10,
      packetPrice: 1,
      packetsPerDay: 1,
      cost: 0
    };
    this.updateStartAge = this.updateStartAge.bind(this);
    this.updateFinishedAge = this.updateFinishedAge.bind(this);
    this.updatePacketPrice = this.updatePacketPrice.bind(this);
    this.updatePacketsPerDay = this.updatePacketsPerDay.bind(this);
    this.updateCost = this.updateCost.bind(this);
  }
  updateStartAge(age) {
    this.setState({startAge: parseInt(age)});
    this.updateCost(parseInt(age), this.state.finishedAge, this.state.packetPrice, this.state.packetsPerDay);
  }
  updateFinishedAge(age) {
    this.setState({finishedAge: parseInt(age)});
    this.updateCost(this.state.startAge, parseInt(age), this.state.packetPrice, this.state.packetsPerDay);
  }
  updatePacketPrice(price) {
    this.setState({packetPrice: parseInt(price)});
    this.updateCost(this.state.startAge, this.state.finishedAge, parseInt(price), this.state.packetsPerDay);
  }
  updatePacketsPerDay(packetsPerDay) {
    this.setState({packetsPerDay: parseInt(packetsPerDay)});
    this.updateCost(this.state.startAge, parseInt(age), this.state.packetPrice, packetsPerDay);
  }
  updateCost(startAge, finishedAge, packetPrice, packetsPerDay) {
    let years = finishedAge - startAge;
    let cost = (years * 365.25) * packetsPerDay * packetPrice;
    this.setState({cost});
  }
  render() {
    return (
      <div>
        <h1>Smoke Calculator</h1>
        <label>Starting age:
          <InputBox
            value={this.state.startAge}
            sendText={this.updateStartAge}/>
        </label>
        <br/>
        <br/>
        <label>Finished age:
          <InputBox
            value={this.state.finishedAge}
            sendText={this.updateFinishedAge}/>
        </label>
        <br/>
        <br/>
        <label>Price per packet:
          <InputBox
            value={this.state.packetPrice}
            sendText={::this.updatePacketPrice}/>
        </label>
        <br/>
        <br/>
        <label>Packets per day:
          <InputBox
            value={this.state.packetsPerDay}
            sendText={::this.updatePacketsPerDay}/>
        </label>
        <p>Cost: {this.state.cost}</p>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
