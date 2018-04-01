import React from "react";
import { Menu, Input, Label } from "semantic-ui-react";

const DeviceListMenu = ({ id, scripts, name, ip, desc, onExecute }) => (
  <Menu>
    <Menu.Item>
      Devices online
      <Label size="mini" color="teal">
        1
      </Label>
    </Menu.Item>

    <Menu.Item position="right">
      <Input className="icon" icon="search" placeholder="Search..." />
    </Menu.Item>
  </Menu>
);

export default DeviceListMenu;
