// eslint-disable-next-line
/*global chrome*/

import React from 'react';

import './App.css';

class App extends React.Component {
  componentDidMount = () => {
    // chrome.storage.sync.get(
    //   ['durationTime', 'message', 'reminderDuration'],
    //   function(items) {
    //     console.log('durationTime', items);
    //   }
    // );
  };

  handleClick = () => {
    chrome.runtime.sendMessage({ time: 5000 });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>F.C Barcelona</p>

          {/* eslint-disable-next-line */}
          <button onClick={this.handleClick}>Submit</button>
        </header>
      </div>
    );
  }
}

export default App;
