import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

// ========================================

interface GameProps { }
interface GameState {
  ON: boolean;
  thing: string;
  count: string;
  strict: string;
  display: string;
  tl: string;
  tr: string;
  bl: string;
  br: string;
  intervalID: number;
  steps: Array<number>;
}

class Game extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {
      ON: false,
      thing: 'thingOFF',
      count: 'countOFF',
      strict: 'strictOFF',
      display: '--',
      tl: 'quarter-circle-top-left',
      tr: 'quarter-circle-top-right',
      bl: 'quarter-circle-bottom-left',
      br: 'quarter-circle-bottom-right',
      intervalID: 0,
      steps: []
    };
  }

  switch() {
    if (this.state.ON) {
      this.setState({
        ON: false,
        thing: 'thingOFF',
        count: 'countOFF',
        strict: 'strictOFF',
        display: '--',
        tl: 'quarter-circle-top-left',
        tr: 'quarter-circle-top-right',
        bl: 'quarter-circle-bottom-left',
        br: 'quarter-circle-bottom-right'
      });
    } else {
      this.setState({
        ON: true,
        thing: 'thingON',
        count: 'countON'
      });
    }
  }

  strict() {
    if (this.state.ON) {
      if (this.state.strict === 'strictON') {
        this.setState({
          strict: 'strictOFF'
        });
      } else {
        this.setState({
          strict: 'strictON'
        });
      }
    }
  }

  start() {
    if (this.state.ON) {
      let d1, d2, d3, d4, d5;
      this.setState({ display: '--', count: 'countON' });
      d1 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 250);
      d2 = setTimeout(() => { this.setState({ count: 'countON' }); }, 500);
      d3 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 750);
      d4 = setTimeout(() => { this.setState({ count: 'countON' }); }, 1000);
      d5 = setTimeout(() => { this.game(); }, 2000);
    }
  }

  game() {
    this.setState({ 
      count: 'counter', 
      display: '01',
      tl: 'quarter-circle-top-left tl',
      tr: 'quarter-circle-top-right tr',
      bl: 'quarter-circle-bottom-left bl',
      br: 'quarter-circle-bottom-right br',
      intervalID: 0,
      steps: []
    });
    this.animation(randm());
  }

  animation(add: number) {
    let intervalID;
    intervalID = setInterval(() => {
      add = add + 1;
      if (add > 10) {
        clearInterval(this.state.intervalID);
      }
      console.log(add);
    }, 1000);
    this.setState({ intervalID: intervalID });
  }

  render() {
    return (
      <div id="game">
        <div id="circle">
          <div id="vertical" />
          <div id="horizontal" />
          <div className={this.state.tl} />
          <div className={this.state.tr} />
          <div className={this.state.bl} />
          <div className={this.state.br} />
          <div id="control">
            <div id={this.state.strict} />
            <div id="logo">
              <b>Simon<span id="reg">&reg;</span></b>
            </div>
            <div id="main">
              <div id={this.state.count}>{this.state.display}</div>
              <div id="start" onClick={() => this.start()} />  
              <div id="strict" onClick={() => this.strict()} />
            </div>
            <div id="sign">
              <div id="COUNT">COUNT</div>
              <div id="START">START</div>
              <div id="STRICT">STRICT</div>
            </div>
            <div id="switch">
              <b id="OFF">OFF</b>      
              <div id="contain" onClick={() => this.switch()}>
                <div id={this.state.thing} />
              </div>
              <b id="ON">ON</b> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function randm() {
  return Math.floor(Math.random() * 4) + 1;
}

ReactDOM.render(<Game />, document.getElementById('root'));