import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

import DeviceCard from '../components/DeviceCard'
const WebSocket = require('ws');


class DevicesList extends Component {
    componentDidMount() {
        this.wss = new WebSocket.Server({ port: 8080 });

        this.wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
            });

            ws.send('something');
        });
    }
    render() {
        return (
            <Card.Group>
                <DeviceCard name="Sunday" ip="192.168.1.34" desc="home device storing most on my illegal sutff" />
            </Card.Group>

        );
    }
}

export default DevicesList;