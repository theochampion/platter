import React from "react";
import ScriptList from "./ScriptList";
import { Card } from "semantic-ui-react";

const DeviceCard = ({ id, scripts, name, ip, desc, onExecute }) => (
  <Card>
    <Card.Content textAlign="left">
      <Card.Header>{name} </Card.Header>
      <Card.Meta>{ip}</Card.Meta>
      <Card.Description>{desc}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ScriptList scripts={scripts} onExecute={onExecute} id={id} />
    </Card.Content>
  </Card>
);

export default DeviceCard;
