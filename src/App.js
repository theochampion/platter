import React, { Component } from 'react';
import './App.css';
import DevicesList from './containers/DevicesList.container'
import Header from './components/Header'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serverOnline: false
    }
  }
  render() {
    return (
      <div className="App">
        <Header serverOnline={this.state.serverOnline} />
        <DevicesList onConnectionChange={status => { console.log("dejbdf", status); this.setState({ serverOnline: status }) }} />

      </div>
    );
  }
}

export default App;
