import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";

import DeviceCard from "../components/DeviceCard";

class DevicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: new Map()
    };

    this.handleExecute = this.handleExecute.bind(this);
  }

  updateDevices(device) {
    this.setState(prevState => {
      switch (device.status) {
        case "online":
          prevState.devices.set(device.id, device);
          break;
        case "offline":
          prevState.devices.delete(device.id);
          break;
        case "script_update":
          prevState.devices.get(device.id).scripts[
            device.scriptNb
          ].running = false;
          break;
      }
      console.log("device", ...prevState.devices);
      console.log("id", device.id);
      console.log(
        "nb",
        prevState.devices.get(device.id).scripts[device.scriptNb]
      );

      return { devices: prevState.devices };
    });
  }

  connectToWSServer() {
    this.ws = new WebSocket("ws://localhost:8080/websocket");

    this.ws.onopen = () => {
      this.props.onConnectionChange(true);
    };
    this.ws.onclose = () => {
      console.log("close");

      this.props.onConnectionChange(false);
      setTimeout(() => {
        console.log("trying to connect");
        this.connectToWSServer();
      }, 2000);
    };

    this.ws.onmessage = msg => {
      console.log("msg", msg.data);

      const device = JSON.parse(msg.data);
      this.updateDevices(device);
    };
  }

  handleExecute(id, scriptNb) {
    console.log("executing script " + scriptNb + " on device " + id);

    this.setState(
      prevState => (prevState.devices.get(id).scripts[scriptNb].running = true)
    );
    this.ws.send(JSON.stringify({ id: id, scriptNb }));
  }

  componentDidMount() {
    this.connectToWSServer();
  }

  render() {
    return (
      <Container>
        <Card.Group>
          {[...this.state.devices].map(device => (
            <DeviceCard
              key={device[1].id}
              id={device[1].id}
              name={device[1].name}
              ip={device[1].ip}
              desc={device[1].desc}
              scripts={device[1].scripts}
              onExecute={this.handleExecute}
            />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

export default DevicesList;
