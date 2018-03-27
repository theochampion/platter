import React, { Component } from 'react';
import './App.css';
import DevicesList from './containers/DevicesList.container'
import Header from './components/Header'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <DevicesList />

      </div>
    );
  }
}

export default App;
