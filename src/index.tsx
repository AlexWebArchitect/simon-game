import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

// ========================================

interface GameProps { }
interface GameState { }

class Game extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div id="game">
        <div id="circle">
          <div id="vertical" />
          <div id="horizontal" />
          <div id="quarter-circle-bottom-right" />
          <div id="quarter-circle-bottom-left" />
          <div id="quarter-circle-top-right" />
          <div id="quarter-circle-top-left" />
          <div id="control">
            <div id="logo">
              <b>Simon<span id="reg">&reg;</span></b>
            </div>
            <div id="ind" />
            <div id="main">
              <div id="count">--</div>
              <div id="start" />
              <div id="strict" />
            </div>
            <div id="sign">
              <div id="COUNT">COUNT</div>
              <div id="START">START</div>
              <div id="STRICT">STRICT</div>
            </div>
            <div id="switch">
              <b id="OFF">OFF</b>      
              <div id="contain">
                <div id="thing" />
              </div>
              <b id="ON">ON</b> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));