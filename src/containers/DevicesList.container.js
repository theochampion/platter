import React, { Component } from 'react';
import { Card, Container } from 'semantic-ui-react'

import DeviceCard from '../components/DeviceCard'


class DevicesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: new Map()
        }


        this.handleExecute = this.handleExecute.bind(this)
        this.handleScriptChange = this.handleScriptChange.bind(this)

    }

    updateDevices(id, device, deleteDevice = false) {
        this.setState(prevState => {

            deleteDevice ? prevState.devices.delete(device.id) : prevState.devices.set(device.id, device)
            console.log("device", ...prevState.devices)
            console.log("id", id)

            return { devices: prevState.devices }
        })
    }

    connectToWSServer() {
        this.ws = new WebSocket('ws://localhost:8080/websocket');

        this.ws.onopen = () => {
            this.props.onConnectionChange(true)
        };
        this.ws.onclose = () => {
            console.log("close")

            this.props.onConnectionChange(false)
            setTimeout(() => { console.log("trying to connect"); this.connectToWSServer() }, 2000)
        };

        this.ws.onmessage = msg => {
            console.log("msg", msg.data)

            const device = JSON.parse(msg.data)
            this.updateDevices(device.id, device, device.status === "offline")
        }
    }

    handleScriptChange(id, script) {
        console.log({ ...this.state.devices.get(id), script: script })
        this.updateDevices(id, { ...this.state.devices.get(id), script: script })
    }

    handleExecute(id) {
        const device = this.state.devices.get(id)
        if (device.script) {
            console.log("executing script " + device.script + " on " + device.id)
            this.ws.send(JSON.stringify({ id: id, script: device.script }))
        }
    }

    componentDidMount() {
        this.connectToWSServer()
    }

    render() {
        return (
            <Container >
                <Card.Group>
                    {[...this.state.devices].map(device => <DeviceCard
                        key={device[1].id}
                        id={device[1].id}
                        name={device[1].name}
                        ip={device[1].ip}
                        desc={device[1].desc}
                        script={device[1].script}
                        onScriptChange={this.handleScriptChange}
                        onExecute={this.handleExecute} />)}
                </Card.Group>
            </Container >
        );
    }
}

export default DevicesList;