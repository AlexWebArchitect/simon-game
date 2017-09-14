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
                <div id="control">q</div>
              </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));