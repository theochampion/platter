import React from "react";
import { Menu, Input, Label } from "semantic-ui-react";

const DeviceListMenu = ({ onlineDevices }) => (
  <Menu>
    <Menu.Item>
      Devices online
      <Label size="mini" color="teal">
        {onlineDevices}
      </Label>
    </Menu.Item>

    <Menu.Item position="right">
      <Input className="icon" icon="search" placeholder="Search..." />
    </Menu.Item>
  </Menu>
);

export default DeviceListMenu;
