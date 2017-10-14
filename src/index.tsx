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
          <div id="control" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));