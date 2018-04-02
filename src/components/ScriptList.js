import React from "react";
import { Button, List, Loader } from "semantic-ui-react";

export default class ScriptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedScript: null };
  }

  render() {
    console.log(this.props);
    const { onExecute, scripts, id } = this.props;
    return (
      <List divided selection>
        {scripts.map((script, idx) => (
          <List.Item
            key={idx}
            onClick={(evt, data) =>
              this.setState({
                selectedScript: this.state.selectedScript === idx ? null : idx
              })
            }
          >
            <List.Content floated="left">
              <List.Header content={script.name} />
              {this.state.selectedScript === idx && (
                <List.Description content={script.desc} />
              )}
            </List.Content>
            <List.Content floated="right">
              {this.state.selectedScript === idx && (
                <Button
                  color="teal"
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
              )}
              {this.state.selectedScript !== idx &&
                script.running && <Loader active inline size="mini" />}
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
