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
  intervalID: any;
  steps: Array<number>;
  presses: number;
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
      steps: [],
      presses: 0
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
      steps: [],
      presses: 0
    });
    this.animation(randm());
  }

  animation(add: number) {
    let steps = this.state.steps;
    let d, d1, p1, p2, p3, p4;
    let intervalID;
    let c = 0;
    let a = 0;
    if (add === 0) {
      a = 1000;
      this.setState({ display: '!!' });
      p1 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 250);
      p2 = setTimeout(() => { this.setState({ count: 'countON' }); }, 500);
      p3 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 750);
      p4 = setTimeout(() => { this.setState({ count: 'counter' }); }, 1000);
    } else {
      steps.push(add);
    }
    let display = steps.length + '';
    if (display.split('').length < 2) {
        display = '0' + steps.length;
    }
    d = setTimeout(() => { this.setState({ steps: steps, display: display, presses: 0 }); }, 200 + a);
    intervalID = setInterval(() => {
      switch (steps[c]) {
        case 1:
          this.setState({ tl: 'qctl' });
          d1 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-left tl' }); }, 500);
          break;
        case 2:
          this.setState({ tr: 'qctr' });
          d1 = setTimeout(() => { this.setState({ tr: 'quarter-circle-top-right tr' }); }, 500);
          break;
        case 3:
          this.setState({ bl: 'qcbl' });
          d1 = setTimeout(() => { this.setState({ bl: 'quarter-circle-bottom-left bl' }); }, 500);
          break;
        case 4:
          this.setState({ br: 'qcbr' });
          d1 = setTimeout(() => { this.setState({ br: 'quarter-circle-bottom-right br' }); }, 500);
          break;
        default:
        break;
      }
      c = c + 1;
      if (c === steps.length) {
        clearInterval(this.state.intervalID);
      }
    }, 1000);
    this.setState({ intervalID: intervalID });
  }

  handlePress(pressed: number) {
    let presses = this.state.presses + 1;
    const steps = this.state.steps;
    let fail;
    if (this.state.ON) {
      if (steps[presses - 1] === pressed) {
        fail = false;
      } else {
        fail = true;
        this.animation(0);
      }
      if (!fail && presses === steps.length) {
        this.animation(randm());
      }
      this.setState({ presses: presses });
    }
  }

  render() {
    return (
      <div id="game">
        <div id="circle">
          <div id="vertical" />
          <div id="horizontal" />
          <div className={this.state.tl} onClick={() => this.handlePress(1)} />
          <div className={this.state.tr} onClick={() => this.handlePress(2)} />
          <div className={this.state.bl} onClick={() => this.handlePress(3)} />
          <div className={this.state.br} onClick={() => this.handlePress(4)} />
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