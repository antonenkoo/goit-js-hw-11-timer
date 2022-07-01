console.log('b');
const calendar = document.querySelector('input[type="date"]');
const clock = document.querySelector('input[type="time"]');

const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');

const days = document.querySelector('[data-value="days"]');
const hours = document.querySelector('[data-value="hours"]');
const mins = document.querySelector('[data-value="mins"]');
const secs = document.querySelector('[data-value="secs"]');

calendar.value = null;

let timer;

class CountdownTimer {
  constructor({ targetDate }) {
    this.targetDate = targetDate;
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      const now = Date.now();
      const distance = this.targetDate.getTime() - now;
      const timeData = this.correctFormatTime(distance);

      this.updateText(timeData);
    });
  }

  updateText({ day, hour, min, sec }) {
    days.textContent = day;
    hours.textContent = hour;
    mins.textContent = min;
    secs.textContent = sec;
  }

  correctFormatTime(distance) {
    const day = this.pad(Math.floor(distance / (1000 * 60 * 60 * 24)));

    const hour = this.pad(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );

    const min = this.pad(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    );
    const sec = this.pad(Math.floor((distance % (1000 * 60)) / 1000));

    return { day, hour, min, sec };
  }

  pad(val) {
    return String(val).padStart(2, '0');
  }

  stop() {
    clearInterval(this.timerId);
  }
}

startBtn.addEventListener('click', () => {
  if (timer) {
    timer.stop();
  }

  if (calendar) {
    console.log(calendar.value);
    timer = new CountdownTimer({
      targetDate: new Date(calendar.value),
    });
  }

  timer.start();
});

stopBtn.addEventListener('click', () => {
  console.log('stop');

  timer.stop();
});

resetBtn.addEventListener('click', () => {
  console.log('reset');

  timer.stop();
  calendar.value = null;
  days.textContent = '00';
  hours.textContent = '00';
  mins.textContent = '00';
  secs.textContent = '00';
});
