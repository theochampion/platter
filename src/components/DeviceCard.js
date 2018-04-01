import React from "react";
import { Button, Card, List, Loader } from "semantic-ui-react";

const DeviceCard = ({ id, scripts, name, ip, desc, onExecute }) => (
  <Card>
    <Card.Content textAlign="left">
      <Card.Header>{name} </Card.Header>
      <Card.Meta>{ip}</Card.Meta>
      <Card.Description>{desc}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <List divided selection>
        {scripts.map((script, idx) => (
          <List.Item key={idx}>
            <Button
              loading={script.running}
              basic
              size="mini"
              onClick={evt => {
                onExecute(id, idx);
              }}
              floated="right"
            >
              Execute
            </Button>
            <List.Content
              floated="left"
              header={script.name}
              description={script.desc}
            />
          </List.Item>
        ))}
      </List>
    </Card.Content>
  </Card>
);

export default DeviceCard;
