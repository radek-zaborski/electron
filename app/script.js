import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    subtitle: <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.<br />
                This app will help you track your time and inform you when it's time to rest.</p>,
    status: 'off',
    time: 0,
    timer: null,
  };

  formatTime = allSeconds => {
    const minutes = Math.floor(allSeconds / 60);
    const seconds = Math.floor(allSeconds - (minutes * 60));
    const resultTime = `${(minutes < 10 ? `0${minutes}` : minutes)}:${(seconds < 10 ? `0${seconds}` : seconds)}`;
    return resultTime;
  };

  startTimer = () => {

    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work',
    });

  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  step = () => {
    this.setState({ time: this.state.time - 1 });
    if (this.state.time == 0) {
      this.playBell();
      if (this.state.status == 'work') {
        this.setState({ status: "rest", time: 20 });
        this.playBell();
      } else if (this.state.status == 'rest') {
        this.setState({ status: "work", time: 1200 });
      }
    }
  };

  stopTimer = () => {

    this.setState({
      status: "off",
      time: 0,
    });

    clearInterval(this.state.timer);
  };

  closeApp = () => {

    window.close();
  }

  render() {

    const { status, subtitle, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>

        {(status === 'off') && subtitle}

        {(status === 'work') && <img src="./images/work.png" />}

        {(status === 'rest') && <img src="./images/rest.png" />}

        <div className="timer">
          {status == "off" ? null : this.formatTime(time)}
        </div>

        {status === 'off' ? <button className="btn" onClick={this.startTimer}>Start</button> : null}
        {status !== 'off' ? <button className="btn" onClick={this.stopTimer}>Stop</button> : null}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));