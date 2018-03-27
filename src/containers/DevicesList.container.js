import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

import DeviceCard from '../components/DeviceCard'


class DevicesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: []
        }
    }
    componentDidMount() {

        this.ws = new WebSocket('ws://localhost:8080/websocket');

        this.ws.onopen = () => {
            console.log("con open")
        };

        this.ws.onmessage = msg => {
            console.log("msg", msg.data)

            const device = JSON.parse(msg.data)
            console.log("device", device)
            this.setState({ devices: this.state.devices.concat([device]) })
        }
    }
    render() {
        return (
            <Card.Group>
                {
                    this.state.devices.map((device, idx) =>
                        <DeviceCard key={idx} name={device.name} ip={device.ip} desc="home device storing most on my illegal sutff" />
                    )
                }
            </Card.Group>

        );
    }
}

export default DevicesList;