(function() {
  'use strict';

  let SIZE = 3;
  let currentNum = 0;
  let PANEL_WIDTH = 50;
  let BOARD_PADDING = 10;
  let startTime;
  let timerId;

  function createPanel(num) {
    let panel;
    panel = document.createElement('div');
    panel.className = 'panel hidden';
    panel.textContent = num;
    panel.addEventListener('click', function() {
      if((this.textContent - 0) === currentNum) {
        this.className = 'panel flipped';
        currentNum++;
      }
      if(currentNum === SIZE * SIZE) {
        clearTimeout(timerId);
      }
    });
    return panel;
  }

  function initBoard() {
    let board = document.getElementById('board');
    let i;
    let panels = [];
    let panel;

    document.getElementById('container').style.width = PANEL_WIDTH * SIZE + BOARD_PADDING * 2 + 'px';


    while(board.firstChild) {
          board.removeChild(board.firstChild);
    }

    for(i = 0; i < SIZE * SIZE; i++) {
        // board.appendChild(createPanel(i));
        panels.push(createPanel(i));
    }

    while(panels.length) {
    panel = panels.splice(Math.floor(Math.random() * panels.length), 1);
    board.appendChild(panel[0]);
    }
  }

  function runTimer() {
    document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
    timerId = setTimeout(function() {
      runTimer();
    }, 10);
  }

  initBoard();

  document.getElementById('btn').addEventListener('click', function() {
    let panels = document.getElementsByClassName('panel');
    let i;
    if (typeof timerId !== 'undefined') {
      clearTimeout(timerId);
    }
    currentNum = 0;
    initBoard();
    for(i = 0; i < panels.length; i++) {
      panels[i].className = 'panel';
    }
    this.textContent = 'RESTART?';
    this.className = 'restart';
    startTime = Date.now();
    runTimer();
  })
})();
