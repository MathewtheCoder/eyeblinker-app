// eslint-disable-next-line
/*global chrome*/
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { Header, Grid, Checkbox, Form, Icon } from 'semantic-ui-react';
import _ from 'underscore';

import './App.css';

class App extends React.Component {
  state = { durationTime: 1, showBlinker: true };

  constructor(props) {
    super(props);
    this.handleChange = _.debounce(this.handleChange.bind(this), 100);
  }

  componentDidMount = () => {
    chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
      const { durationTime, showBlinker } = items;
      this.setState({
        durationTime,
        showBlinker
      });
    });
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    chrome.runtime.sendMessage({ [name]: value });
  };

  handleClick = () => {
    const { showBlinker } = this.state;
    const showBlinkerOrNot = showBlinker;
    this.setState({ showBlinker: !showBlinkerOrNot });
    chrome.runtime.sendMessage({ showBlinker: !showBlinkerOrNot });
  };

  render() {
    const { durationTime, showBlinker } = this.state;

    return (
      <div className="App">
        <Grid columns={2} className="Item" textAlign="center">
          <Grid.Column computer="8">
            <Header as="h3">Eye Blinker</Header>
          </Grid.Column>
          <Grid.Column computer="8">
            <Checkbox
              toggle
              onChange={this.handleClick}
              checked={showBlinker}
            />
          </Grid.Column>
        </Grid>

        <Grid columns={1} className="Item">
          <Grid.Column as={Form}>
            <Form.Input
              label={`Duration : ${durationTime} Minutes `}
              min={1}
              max={60}
              name="durationTime"
              onChange={this.handleChange}
              step={5}
              type="range"
              value={durationTime}
            />
          </Grid.Column>
        </Grid>

        <Grid columns={2}>
          <Grid.Column computer="8">
            {/* <Header as="h5">Eye Blinker</Header> */}
          </Grid.Column>

          <Grid.Column computer="8" textAlign="right">
            <Icon name="share alternate" size="large" />
            <Icon name="twitter" size="large" />
            <Icon name="facebook" size="large" />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
