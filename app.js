import React from 'react';
import ReactDOM from 'react-dom';

let styles = {
  layout: {
    width: '800px',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    color: '#666'
  },
  cost: {
    fontSize: '36px',
    margin: '0'
  },
  iconLayout: {
    width: '43%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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
        id={this.props.id}
        type='text'
        value={this.props.value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder} />
    );
  }
}

class AppIcon extends React.Component {
  static defaultProps = {
    viewBox: '0 0 200 250',
    width: '50px',
    height: '75px'
  }
  renderIcon() {
    return (
      <g id='stop-smoking-logo' transform='translate(-294.000000, -163.000000)'>
        <g id='icon' transform='translate(294.000000, 163.000000)'>
          <rect id='Rectangle-1' fill='#F44336' x='0' y='0' width='200' height='249.003984'></rect>
          <path d='M200,250 L0,250 L0,136.454183 L200,136.454183 L200,250 Z M200,136.454189 L0,136.454185 L100,35.8565737 L200,136.454189 Z' id='Rectangle-2' fill='#FFFFFF'></path>
          <path d='M2.5,230.079681 L197.5,230.079681' id='Line' stroke='#F44336' strokeWidth='5' strokeLinecap='square'></path>
          <path d='M0.5,14.4422311 L199.5,14.4422311' id='Line' stroke='#FFFFFF' strokeLinecap='square'></path>
      </g>
    </g>
    );
  }
  render() {
    return (
      <svg
        viewBox={this.props.viewBox}
        width={this.props.width}
        height={this.props.height}
        >
        {this.renderIcon()}
      </svg>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      yearsSmoking: '',
      packetPrice: '',
      packetsPerDay: '',
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
        <div style={styles.iconLayout}>
          <AppIcon/>
          <h4>Smoke Calculator</h4>
        </div>
        <br/>
        <div className='row'>
          <div className='input-field col s4'>
            <InputBox
              value={this.state.yearsSmoking}
              sendText={this.updateYears}
              id='yearsSmoking'/>
            <label htmlFor='yearsSmoking'>Years smoking</label>
          </div>
          <div className='input-field col s4'>
            <InputBox
              value={this.state.packetPrice}
              sendText={this.updatePacketPrice}
              id='pricePerPacket'/>
            <label htmlFor='pricePerPacket'>Price per packet</label>
          </div>
          <div className='input-field col s4'>
            <InputBox
              value={this.state.packetsPerDay}
              sendText={this.updatePacketsPerDay}
              id='packetsPerDay'/>
            <label htmlFor='packetsPerDay'>Packets per day</label>
          </div>
        </div>
        <p style={styles.cost}>{formatCost}</p>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
