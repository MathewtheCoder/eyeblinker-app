// eslint-disable-next-line
/*global chrome*/
import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { Grid, Icon, Loader } from 'semantic-ui-react';

import Switch from 'rc-switch';

import { Slider } from 'react-semantic-ui-range';

import './App.css';

const title = 'Eye Blinker';
const post =
  'A simple chrome extension that helps you to follow the  20-20-20 rule. Built by @muhsinkeramam';
const url =
  'https://chrome.google.com/webstore/detail/eye-blinker/fbgchecgijgcacfckobealojikbohcdd';

class App extends React.Component {
  state = { durationTime: 20, showBlinker: true, showWindow: true };

  componentDidMount = () => {
    if (chrome && chrome.storage) {
      chrome.storage.sync.get(['durationTime', 'showBlinker'], items => {
        const { durationTime, showBlinker } = items;
        this.setState({
          durationTime,
          showBlinker,
          showWindow: true
        });
      });
    }
  };

  sendMessageToChrome = ({ key, value }) => {
    if (chrome && chrome.runtime) {
      chrome.runtime.sendMessage({ [key]: value });
    }
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

  shareViaTwitter = () => {
    window.open(
      // eslint-disable-next-line
      'http://twitter.com/share?url=' +
        encodeURIComponent(url) +
        '&text=' +
        encodeURIComponent(post),
      '',
      'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
    );
  };

  shareViaFacebook = () => {
    window.open(
      // eslint-disable-next-line
      'http://www.facebook.com/sharer.php?s=100&p[title]=' +
        encodeURIComponent(title) +
        '&p[summary]=' +
        encodeURIComponent(post) +
        '&p[url]=' +
        url,
      'sharer',
      'top=0,left=0,toolbar=0,status=0,width=550,height=450'
    );
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
                value={durationTime}
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
          <Grid.Column computer="8" />
          <Grid.Column computer="8" textAlign="right">
            <Icon
              name="facebook"
              size="large"
              className="icon"
              onClick={this.shareViaFacebook}
            />
            <Icon
              name="twitter"
              size="large"
              className="icon"
              onClick={this.shareViaTwitter}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
