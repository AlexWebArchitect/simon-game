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
      let sound = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${steps[c]}.mp3`);
      switch (steps[c]) {
        case 1:
          this.setState({ tl: 'qctl' });
          sound.play();
          d1 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-left tl' }); }, 500);
          break;
        case 2:
          this.setState({ tr: 'qctr' });
          sound.play();
          d1 = setTimeout(() => { this.setState({ tr: 'quarter-circle-top-right tr' }); }, 500);
          break;
        case 3:
          this.setState({ bl: 'qcbl' });
          sound.play();
          d1 = setTimeout(() => { this.setState({ bl: 'quarter-circle-bottom-left bl' }); }, 500);
          break;
        case 4:
          this.setState({ br: 'qcbr' });
          sound.play();
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
      let sound = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${pressed}.mp3`);
      sound.play();
      if (steps[presses - 1] === pressed) {
        fail = false;
      } else {
        fail = true;
        this.state.strict === 'strictOFF' ? this.animation(0) : this.gg();
      }
      if (!fail && presses === steps.length && presses !== 20) {
        this.animation(randm());
      }
      if (!fail && presses === 20) {
        this.win();
      }
      this.setState({ presses: presses });
    }
  }

  gg() {
    let p1, p2, p3, p4, p5;
    this.setState({ display: '!!' });
    p1 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 250);
    p2 = setTimeout(() => { this.setState({ count: 'countON' }); }, 500);
    p3 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 750);
    p4 = setTimeout(() => { this.setState({ count: 'countON' }); }, 1000);
    p5 = setTimeout(() => { this.start(); }, 1500);
  }

  win() {
    let q1, q2, q3, q4, q5, q6;
    const button = this.state.steps[this.state.steps.length - 1];
    let s1, s2, s3, s4, s5, s6, s7;
    this.setState({ display: '**' });
    q1 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 500);
    q2 = setTimeout(() => { this.setState({ count: 'countON' }); }, 750);
    q3 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 1250);
    q4 = setTimeout(() => { this.setState({ count: 'countON' }); }, 1500);
    q5 = setTimeout(() => { this.setState({ count: 'countOFF' }); }, 1750);
    q6 = setTimeout(() => { this.setState({ count: 'countON' }); }, 2250);
    let sound = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${button}.mp3`);
    switch (button) {
      case 1:
        this.setState({ tl: 'qctl' });
        sound.play();
        s1 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-left tl' }); }, 250);
        s2 = setTimeout(() => { this.setState({ tl: 'qctl' }); }, 500);
        sound.play();
        s3 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-left tl' }); }, 750);
        s4 = setTimeout(() => { this.setState({ tl: 'qctl' }); }, 1000);
        sound.play();
        s5 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-left tl' }); }, 1250);
        s6 = setTimeout(() => { this.setState({ tl: 'qctl' }); }, 1500);
        sound.play();
        s7 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-left tl' }); }, 1750);
        break;
      case 2:
        this.setState({ tl: 'qctr' });
        sound.play();
        s1 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-right tr' }); }, 250);
        s2 = setTimeout(() => { this.setState({ tl: 'qctr' }); }, 500);
        sound.play();
        s3 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-right tr' }); }, 750);
        s4 = setTimeout(() => { this.setState({ tl: 'qctr' }); }, 1000);
        sound.play();
        s5 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-right tr' }); }, 1250);
        s6 = setTimeout(() => { this.setState({ tl: 'qctr' }); }, 1500);
        sound.play();
        s7 = setTimeout(() => { this.setState({ tl: 'quarter-circle-top-right tr' }); }, 1750);
        break;
      case 3:
        this.setState({ tl: 'qcbl' });
        sound.play();
        s1 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-left bl' }); }, 250);
        s2 = setTimeout(() => { this.setState({ tl: 'qcbl' }); }, 500);
        sound.play();
        s3 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-left bl' }); }, 750);
        s4 = setTimeout(() => { this.setState({ tl: 'qcbl' }); }, 1000);
        sound.play();
        s5 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-left bl' }); }, 1250);
        s6 = setTimeout(() => { this.setState({ tl: 'qcbl' }); }, 1500);
        sound.play();
        s7 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-left bl' }); }, 1750);
        break;
      case 4:
        this.setState({ tl: 'qcbr' });
        sound.play();
        s1 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-right br' }); }, 250);
        s2 = setTimeout(() => { this.setState({ tl: 'qcbr' }); }, 500);
        sound.play();
        s3 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-right br' }); }, 750);
        s4 = setTimeout(() => { this.setState({ tl: 'qcbr' }); }, 1000);
        sound.play();
        s5 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-right br' }); }, 1250);
        s6 = setTimeout(() => { this.setState({ tl: 'qcbr' }); }, 1500);
        sound.play();
        s7 = setTimeout(() => { this.setState({ tl: 'quarter-circle-bottom-right br' }); }, 1750);
        break;
      default:
      break;
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