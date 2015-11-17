import React from 'react';
import ReactDOM from 'react-dom';

let styles = {
  layout: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'center',
    fontFamily: 'Helvetica'
  },
  inputLayout: {
    display: 'flex',
    alignItems: 'space-between'
  },
  logo: {
    width: '52px',
    height: '64px',
    margin: 'auto'
  }
}

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
      yearsSmoking: 10,
      packetPrice: 1,
      packetsPerDay: 1,
      cost: 0
    };
  }
  updateYears = (yearsSmoking) => {
    const cost = this.getCost(Object.assign(this.state, {yearsSmoking}));
    this.setState({yearsSmoking, cost});
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
    return state.yearsSmoking * 365.25 * state.packetsPerDay * state.packetPrice;
  }
  formatCost = () => {
    return this.state.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  render() {
    const formatCost = `$${this.formatCost()}`;
    return (
      <div style={styles.layout}>
        <image style={styles.logo} src='stop-smoking-logo.png'/>
        <h2>Smoke Calculator</h2>
        <div style={styles.inputLayout}>
          <label>Years smoking:
            <InputBox
              value={this.state.yearsSmoking}
              sendText={this.updateYears}/>
          </label>
        </div>
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
