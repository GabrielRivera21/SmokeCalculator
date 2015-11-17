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
        type='text'
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
  updateStartAge = (startAge) => {
    const cost = this.getCost(Object.assign(this.state, {startAge}));
    this.setState({startAge, cost});
  }
  updateFinishedAge = (finishedAge) => {
    const cost = this.getCost(Object.assign(this.state, {finishedAge}));
    this.setState({finishedAge, cost});
  }
  updatePacketPrice = (packetPrice) => {
    const cost = this.getCost(Object.assign(this.state, {packetPrice}));
    this.setState({packetPrice, cost});
  }
  updatePacketsPerDay = (packetsPerDay) => {
    const cost = this.getCost(Object.assign(this.state, {packetsPerDay}));
    this.setState({packetsPerDay, cost});
  }
  getCost = (state) => {
    const years = state.finishedAge - state.startAge;
    return years * 365.25 * state.packetsPerDay * state.packetPrice;
  }
  formatCost = () => {
    return this.state.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  render() {
    const formatCost = `$${this.formatCost()}`;
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
            sendText={this.updatePacketPrice}/>
        </label>
        <br/>
        <br/>
        <label>Packets per day:
          <InputBox
            value={this.state.packetsPerDay}
            sendText={this.updatePacketsPerDay}/>
        </label>
        <p>Cost: {formatCost}</p>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
