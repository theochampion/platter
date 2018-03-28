import React from 'react'
import { Button, Card, Dropdown } from 'semantic-ui-react'

const DeviceCard = ({ id, script, name, ip, desc, onScriptChange, onExecute }) => (
    <Card>
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
            <Dropdown
                button
                className='icon'
                floating
                labeled
                icon='code'
                options={[{ key: 'Arabic', text: 'Arabic', value: 'Arabic' }]}
                search
                text={script || "Select Script"}
                onChange={(evt, data) => { onScriptChange(id, data.value) }}
            />
            <Button onClick={(evt) => { onExecute(id) }} color='green' floated='right'>Execute</Button>
        </Card.Content>
    </Card>
)

export default DeviceCard