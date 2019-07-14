// eslint-disable-next-line
/*global chrome*/
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { Grid, Icon, Loader } from 'semantic-ui-react';

import Switch from 'rc-switch';

import { Slider } from 'react-semantic-ui-range';

import './App.css';

class App extends React.Component {
  state = { durationTime: 20, showBlinker: true, showWindow: true };

  // this.handleChange = _.debounce(this.handleChange.bind(this), 100);s

  componentDidMount = () => {
    chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
      const { durationTime, showBlinker } = items;
      this.setState({
        durationTime,
        showBlinker,
        showWindow: true
      });
    });
  };

  sendMessageToChrome = ({ key, value }) => {
    chrome.runtime.sendMessage({ [key]: value });
  };

  handleChange = ({ durationTime }) => {
    this.setState({ durationTime });

    this.sendMessageToChrome({ key: 'durationTime', value: durationTime });
  };

  handleClick = () => {
    const { showBlinker } = this.state;
    const showBlinkerOrNot = showBlinker;
    this.setState({ showBlinker: !showBlinkerOrNot });
    this.sendMessageToChrome({ key: 'showBlinker', value: !showBlinkerOrNot });
  };

  openTwitter = () => {
    window.open('https://twitter.com/muhsinkeramam', '_blank');
  };

  render() {
    const { durationTime, showBlinker, showWindow } = this.state;

    return (
      <div className="App">
        <Grid columns={2} className="Item" textAlign="center">
          <Grid.Column computer="8">
            <h2>Eye Blinker</h2>
          </Grid.Column>
          <Grid.Column computer="8" className="rc-box-wrapper">
            <Switch
              onChange={this.handleClick}
              checked={showBlinker}
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </Grid.Column>
        </Grid>

        <Grid columns={1} className="Item">
          {showWindow ? (
            <Grid.Column>
              <h5 className="durationText">{`Duration : ${durationTime} Minutes `}</h5>

              <Slider
                color="black"
                inverted={false}
                settings={{
                  start: durationTime,
                  min: 5,
                  max: 60,
                  step: 5,
                  onChange: value => {
                    this.handleChange({
                      durationTime: value
                    });
                  }
                }}
              />
            </Grid.Column>
          ) : (
            <Grid.Column>
              <Loader active inline="centered" />
            </Grid.Column>
          )}
        </Grid>

        <Grid columns={2}>
          <Grid.Column computer="8">
            {/* <Header as="h5">Eye Blinker</Header> */}
          </Grid.Column>

          <Grid.Column computer="8" textAlign="right">
            <Icon name="share alternate" size="large" className="icon" />
            <Icon
              name="twitter"
              size="large"
              className="icon"
              onClick={this.openTwitter}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
