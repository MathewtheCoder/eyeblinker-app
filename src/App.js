// eslint-disable-next-line
/*global chrome*/
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { Header, Grid, Checkbox, Form, Icon } from 'semantic-ui-react';

import './App.css';

class App extends React.Component {
  state = { durationTime: 1 };

  handleChange = (e, { name, value }) => {
    console.log(name, value);
    this.setState({ [name]: value });

    chrome.runtime.sendMessage({ [name]: value });
  };

  toggleVisibility = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));

  componentDidMount = () => {
    // chrome.storage.sync.get(['durationTime'], items => {
    //   if (items.durationTime) {
    //     this.setState({
    //       durationTime: items.durationTime / 1000
    //     });
    //   }
    // });
  };

  handleClick = () => {
    chrome.runtime.sendMessage({ time: 5000 });
  };

  render() {
    const { durationTime } = this.state;

    return (
      <div className="App">
        <Grid columns={2} className="Item" textAlign="center">
          <Grid.Column computer="8">
            <Header as="h3">Eye Blinker</Header>
          </Grid.Column>
          <Grid.Column computer="8">
            <Checkbox toggle onChange={this.handleClick} />
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
              step={1}
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
