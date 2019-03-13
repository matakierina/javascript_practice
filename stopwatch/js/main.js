(function() {
  'use strict';

  let timer = document.getElementById('timer');
  let start = document.getElementById('start');
  let stop = document.getElementById('stop');
  let reset = document.getElementById('reset');

  let startTime;
  let elapsedTime = 0; // 経過時間
  let timerId;
  let timeToAdd = 0;
  let isRunning = false;

  function updateTimerText() {
    // 135200 -> 02:15.200
    // m = 135200 / 60 / 1000　の商
    // s = 135200 % 60000 / 1000
    // ms = 135200 % 1000
    let m = Math.floor(elapsedTime / 60 / 1000);
    let s = Math.floor(elapsedTime % 60000 / 1000);
    let ms = elapsedTime % 1000;

    // 3 -> '03'
    // 12 -> '12'

    // 3 -> '0' + 3 -> '03'
    // 12 -> '0' + 12 -> '012'

    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms;
  }

  function countUp() {
    timerId = setTimeout(function() {
      // elapsedTime = Date.now() - startTime;
      elapsedTime = Date.now() - startTime + timeToAdd;
      // console.log(elapsedTime);
      updateTimerText();
      countUp();
    }, 10);
  }

  // start.className = 'btn';
  // stop.className = 'btn inactive';
  // reset.className = 'btn inactive';

  const updateButtonState = (startButtonState, stopButtonState, resetButtonState) => {
    start.className = startButtonState ? 'btn' : 'btn inactive';
    stop.className = stopButtonState ? 'btn' : 'btn inactive';
    reset.className = resetButtonState ? 'btn' : 'btn inactive';
  }

  updateButtonState(true, false, false);

  start.addEventListener('click', function() {
    if (isRunning === true) {
      return;
    }
    isRunning = true;
    // start:false, stop:true, reset:false
    updateButtonState(false, true, false);
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', function() {
    if (isRunning === false) {
      return;
    }
    isRunning = false;
    // start:true, stop:false, reset:true
    updateButtonState(true, false, true);

    clearTimeout(timerId);
    timeToAdd += Date.now() - startTime;
  });

  reset.addEventListener('click', function() {
    if (isRunning === true) {
      return;
    }
    // start:true, stop:false, reset:false
    updateButtonState(true, false, false);
    elapsedTime = 0;
    timeToAdd = 0;
    updateTimerText();
  });

})();
