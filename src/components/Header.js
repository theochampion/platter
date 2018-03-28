import React from 'react'
import { Menu, Image, Label, Container } from 'semantic-ui-react'


const Header = ({ serverOnline }) => (
    <Menu >
        <Container>

            <Menu.Item as='a' header>
                <Image
                    size='mini'
                    src='https://image.flaticon.com/icons/svg/609/609864.svg'
                    style={{ marginRight: '1em' }}
                />
                Platter
        </Menu.Item>
            <Menu.Item position="right">
                <Label color={serverOnline ? 'green' : 'red'} >
                    {serverOnline ? "online" : "offline"}
                </Label>
            </Menu.Item>
        </Container>

    </Menu>
)

export default Header