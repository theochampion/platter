import React, { Component } from "react";
import { Card, Container, Grid } from "semantic-ui-react";

import WSEventDispatcher from "../utils/WSEventDispatcher";

import DeviceCard from "../components/DeviceCard";
import DeviceListMenu from "../components/DeviceListMenu";
import EventLog from "../components/EventLog";

class DevicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: new Map(),
      events: []
    };

    this.handleExecute = this.handleExecute.bind(this);
  }

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
        const device = ps.devices.get(eventData.id);
        const script = device.scripts[eventData.scriptNb];
        script.running = false;

        return {
          devices: ps.devices,
          events: [
            ...ps.events,
            {
              deviceName: device.name,
              scriptName: script.name,
              returnCode: eventData.returnCode
            }
          ]
        };
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
        <DeviceListMenu onlineDevices={this.state.devices.size} />
        <Grid column="2">
          <Grid.Column width={4}>
            <EventLog events={this.state.events} />
          </Grid.Column>
          <Grid.Column width={12}>
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
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default DevicesList;
