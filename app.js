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
  }
  updateStartAge(age) {
    this.setState({startAge: parseInt(age)});
    this.updateCost();
  }
  updateFinishedAge(age) {
    console.log(this.state.finishedAge);
    this.setState({finishedAge: parseInt(age)});
    console.log(this.state.finishedAge);
    this.updateCost();
  }
  updatePacketPrice(price) {
    this.setState({packetPrice: parseInt(price)});
    this.updateCost();
  }
  updatePacketsPerDay(packetsPerDay) {
    this.setState({packetsPerDay: parseInt(packetsPerDay)});
    this.updateCost();
  }
  updateCost() {
    let years = this.state.finishedAge - this.state.startAge;
    let cost = (years * 365.25) * this.state.packetsPerDay * this.state.packetPrice;
    this.setState({cost});
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Smoke Calculator</h1>
        <label>Starting age:
          <InputBox
            value={this.state.startAge}
            sendText={::this.updateStartAge}/>
        </label>
        <br/>
        <br/>
        <label>Finished age:
          <InputBox
            value={this.state.finishedAge}
            sendText={::this.updateFinishedAge}/>
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
