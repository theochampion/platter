import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react'

import DeviceCard from '../components/DeviceCard'


class DevicesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: new Map()
        }
    }
    componentDidMount() {
        this.ws = new WebSocket('ws://localhost:8080/websocket');

        this.ws.onopen = () => {
            this.props.onConnectionChange(true)
        };
        this.ws.onclose = () => {
            this.props.onConnectionChange(false)
        };
        this.ws.onerror = () => {
            this.props.onConnectionChange(false)
        };

        this.ws.onmessage = msg => {
            console.log("msg", msg.data)

            const device = JSON.parse(msg.data)
            this.setState(prevState => {

                device.status === 'online' ? prevState.devices.set(device.id, device) : prevState.devices.delete(device.id)
                console.log("device", ...prevState.devices)
                console.log("ip", device.id)

                return { devices: prevState.devices }
            })
        }
    }

    render() {
        return (
            <Container >
                <Card.Group>
                    {[...this.state.devices].map((device, idx) => <DeviceCard key={idx} name={device[1].name} ip={device[1].ip} desc="home device storing most on my illegal sutff" />)}
                </Card.Group>
            </Container >
        );
    }
}

export default DevicesList;