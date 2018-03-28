import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

import DeviceCard from '../components/DeviceCard'


class DevicesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: new Map()
        }
    }
    componentDidMount() {
        const { state } = this.state
        this.ws = new WebSocket('ws://localhost:8080/websocket');

        this.ws.onopen = () => {
            console.log("con open")
        };

        this.ws.onmessage = msg => {
            console.log("msg", msg.data)

            const device = JSON.parse(msg.data)
            this.setState(prevState => {
                console.log("device", device)

                device.status == 'online' ? prevState.devices.set(device.id, device) : prevState.devices.delete(device.id)
                return { devices: prevState.devices }
            })
        }
    }

    render() {
        return (
            <Card.Group>
                {[...this.state.devices].map((device, idx) => <DeviceCard key={idx} name={device[1].name} ip={device[1].ip} desc="home device storing most on my illegal sutff" />)}
            </Card.Group>

        );
    }
}

export default DevicesList;