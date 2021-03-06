(function() {
  'use strict';

  var words = [
    'apple',
    'wallet',
    'phone',
    'chair',
    'table',
    'happy',
    'goodmorning',
    'thankyou',
  ];
  var currentWord;
  var currentLocation;
  var score;
  var miss;
  var timer;
  var target = document.getElementById('target');
  var scoreLabel = document.getElementById('score');
  var missLabel = document.getElementById('miss');
  var timerLabel = document.getElementById('timer');
  var isStarted;
  var timerId;

  function init() {
    currentWord = 'Click or Enter To Start';
    currentLocation = 0;
    score = 0;
    miss = 0;
    timer = 10;
    target.innerHTML = currentWord;
    scoreLabel.innerHTML = score;
    missLabel.innerHTML = miss;
    timerLabel.innerHTML = timer;
    isStarted = false;
  }

  init();

  function updateTimer() {
    timerId = setTimeout(function() {
      timer--;
      timerLabel.innerHTML = timer;
      if (timer <= 0) {
        // alert('GAME OVER...!');
        var accuracy = score + miss;
        if (accuracy === 0) {
          accuracy = '0.00';
        } else {
          accuracy = ((score / (score + miss)) * 100).toFixed(2);
        }
        alert(score + ' letters, ' + miss + ' miss! ' + accuracy + ' % accuracy');
        clearTimeout(timerId);
        init();
        return;
      }
      updateTimer();
    }, 1000);
  }

  function setTarget() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    target.innerHTML = currentWord;
    currentLocation = 0;
  }

  window.addEventListener('click', function() {
    if (isStarted !== true) {
      isStarted = true;
      setTarget();
      updateTimer();
    }
  });

  window.addEventListener('keyup', function(e) {
    if (e.keyCode === 13){
      if (isStarted !== true) {
      isStarted = true;
      setTarget();
      updateTimer();
      }
    }
  });

  window.addEventListener('keyup', function(e) {
    if (e.keyCode !== 13){
      if (isStarted !== true) {
        return;
      }
      // e.keyCode
      // console.log(String.fromCharCode(e.keyCode));
      if (String.fromCharCode(e.keyCode) === currentWord[currentLocation].toUpperCase()) {
        currentLocation++;
        var placeholder = '';
        for (var i = 0; i < currentLocation; i++) {
          placeholder += '_';
        }
        target.innerHTML = placeholder + currentWord.substring(currentLocation);
        // console.log('score!');
        score++;
        scoreLabel.innerHTML = score;
        if (currentLocation === currentWord.length) {
          setTarget();
        }
      } else {
        // console.log('miss!');
        miss++;
        missLabel.innerHTML = miss;
      }
    }
  });

})();
