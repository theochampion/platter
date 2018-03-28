import React from 'react'
import { Button, Card } from 'semantic-ui-react'

const DeviceCard = ({ name, ip, desc }) => (
    <Card >
        <Card.Content textAlign="left">
            <Card.Header>
                {name}        </Card.Header>
            <Card.Meta>
                {ip}
            </Card.Meta>
            <Card.Description>
                {desc}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button color='green' floated='right'>Wipe</Button>
        </Card.Content>
    </Card>
)

export default DeviceCard