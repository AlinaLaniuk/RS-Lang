import { Callback } from '../../types/types';
import './style.css';

class Timer {
  private timer: HTMLElement;

  private timeLabel: HTMLSpanElement;

  private timeLimit = 60;

  private timePassed = 0;

  private timeLeft = this.timeLimit;

  private interval: NodeJS.Timer;

  constructor(callback: Callback) {
    this.timer = document.createElement('div');
    this.timer.className = 'timer';

    const pathRemainingColor = '#00ff00';

    const timerCircle = `
      <svg class="timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="timer__circle">
          <circle class="timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="timer-path-remaining"
            stroke-dasharray="283"
            class="timer__path-remaining ${pathRemainingColor}"
            d="
             M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
    `;
    this.timer.innerHTML = timerCircle;

    this.timeLabel = document.createElement('span');
    this.timeLabel.className = 'timer-label';
    this.timeLabel.innerText = this.timeLeft.toString();
    this.timer.append(this.timeLabel);

    this.interval = setInterval(
      () => {
        this.timePassed += 1;
        this.timeLeft = this.timeLimit - this.timePassed;
        this.timeLabel.innerText = this.timeLeft.toString();

        if (this.timeLeft <= 0) {
          clearInterval(this.interval);
          callback();
        }
      },
      1000,
    );
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    return this.timer;
  }
}

export default Timer;
