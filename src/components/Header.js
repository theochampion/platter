import React from 'react'
import { Menu, Image } from 'semantic-ui-react'


const Header = () => (
    <Menu  >
        <Menu.Item as='a' header>
            <Image
                size='mini'
                src='https://image.flaticon.com/icons/svg/609/609864.svg'
                style={{ marginRight: '1em' }}
            />
            Platter
        </Menu.Item>
    </Menu>
)

export default Header