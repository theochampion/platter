import React from "react";
import { List, Message, Segment, Header } from "semantic-ui-react";

const EventLog = ({ events }) => (
  <Segment>
    <Header size="tiny">Activity</Header>

    <List divided relaxed size="small">
      {events.map((event, idx) => (
        <List.Item key={idx}>
          <List.Icon
            verticalAlign="middle"
            name="warning sign"
            color="orange"
          />
          <List.Content>
            <List.Description>
              Last seen watching
              <a>
                <b>Bob's Burgers</b>
              </a>
              10 hours ago.
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </Segment>
);

export default EventLog;
