import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";

import WSEventDispatcher from "../utils/WSEventDispatcher";

import DeviceCard from "../components/DeviceCard";
import DeviceListMenu from "../components/DeviceListMenu";

class DevicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: new Map()
    };

    this.handleExecute = this.handleExecute.bind(this);
  }

  //   updateDevices(device) {
  //     this.setState(prevState => {
  //       switch (device.status) {
  //         case "online":
  //           prevState.devices.set(device.id, device);
  //           break;
  //         case "offline":
  //           prevState.devices.delete(device.id);
  //           break;
  //         case "script_update":
  //           prevState.devices.get(device.id).scripts[
  //             device.scriptNb
  //           ].running = false;
  //           break;
  //       }
  //       console.log("device", ...prevState.devices);
  //       console.log("id", device.id);
  //       console.log(
  //         "nb",
  //         prevState.devices.get(device.id).scripts[device.scriptNb]
  //       );

  //       return { devices: prevState.devices };
  //     });
  //   }

  connectToWSServer() {
    console.log("connecting to ws");
    this.ws = new WSEventDispatcher("ws://localhost:8080/websocket");

    this.ws.bind("open", () => {
      this.props.onConnectionChange(true); // maybe I can remove the closure ?
    });

    this.ws.bind("close", () => {
      console.log("close");
      this.props.onConnectionChange(false);
      setTimeout(() => {
        console.log("trying to connect");
        this.connectToWSServer();
      }, 2000);
    });

    this.ws.bind("add_device", eventData => {
      this.setState(ps => {
        ps.devices.set(eventData.id, eventData);
        return { devices: ps.devices };
      });
    });

    this.ws.bind("delete_device", eventData => {
      this.setState(ps => {
        ps.devices.delete(eventData.id);
        return { devices: ps.devices };
      });
    });

    this.ws.bind("script_update", eventData => {
      this.setState(ps => {
        ps.devices.get(eventData.id).scripts[
          eventData.scriptNb
        ].running = false;
        return { devices: ps.devices };
      });
    });
  }

  handleExecute(id, scriptNb) {
    console.log("executing script " + scriptNb + " on device " + id);

    this.setState(
      prevState => (prevState.devices.get(id).scripts[scriptNb].running = true)
    );
    this.ws.send("script_order", { id: id, scriptNb });
  }

  componentDidMount() {
    this.connectToWSServer();
  }

  render() {
    return (
      <Container>
        <DeviceListMenu />
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
