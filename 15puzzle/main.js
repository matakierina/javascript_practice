(function() {
  'use strict';

  let canvas = document.getElementById('stage');
  let context;
  let image;
  let IMAGE_URL = '15puzzle.png';
  // tiles[0][0] = 0;
  // tiles[0][1] = 1;
  // tiles[0][2] = 2;
  // tiles[0][3] = 3;
  let tiles = [];
  let ROW_COUNT = 4;
  let COL_COUNT = 4;
  let PIC_WIDTH = 280;
  let PIC_HEIGHT = 280;
  let TILE_WIDTH = PIC_WIDTH / COL_COUNT;
  let TILE_HEIGHT = PIC_HEIGHT / ROW_COUNT;
  let UDLR = [
    [ 0, -1],
    [ 0,  1],
    [-1,  0],
    [ 1,  0]
  ];
  let moveCount = 32;

  function initTiles() {
      let row, col;
      for (row = 0; row < ROW_COUNT; row++) {
        tiles[row] = [];
        for (col = 0; col < COL_COUNT; col++) {
          tiles[row][col] = row * COL_COUNT + col;
        }
      }
      tiles[ROW_COUNT - 1][COL_COUNT - 1] = -1;
  }

  function drawPuzzle() {
    let row, col;
    let sx, sy;
    let dx, dy;

    for (row = 0; row < ROW_COUNT; row++) {
      for (col = 0; col < COL_COUNT; col++) {
        dx = col * TILE_WIDTH;
        dy = row * TILE_HEIGHT;

        if(tiles[row][col] === -1) {
          context.fillStyle = '#A5ABAF';
          context.fillRect(dx, dy, TILE_WIDTH, TILE_HEIGHT);
        } else {
        sx = (tiles[row][col] % COL_COUNT) * TILE_WIDTH;
        sy = Math.floor(tiles[row][col] / ROW_COUNT) * TILE_HEIGHT;
        context.drawImage(image, sx, sy, TILE_WIDTH, TILE_HEIGHT, dx, dy, TILE_WIDTH, TILE_HEIGHT)
        }
      }
    }

  }

  function checkResult() {
    let row, col;

    for (row = 0; row < ROW_COUNT; row++) {
      for (col = 0; col < COL_COUNT; col++) {
        if (row === ROW_COUNT - 1 && col === COL_COUNT -1) {
          return true;
        }
        if (tiles[row][col] !== row * COL_COUNT + col) {
          return false;
        }
      }
    }

  }

  function moveBlank(count) {
    let blankRow, blankCol;
    let targetPosition;
    let targetRow, targetCol;

    blankRow = ROW_COUNT - 1;
    blankCol = COL_COUNT - 1;

    while(true) {
      targetPosition = Math.floor(Math.random() * UDLR.length);
      targetRow = blankRow + UDLR[targetPosition][1];
      targetCol = blankCol + UDLR[targetPosition][0];
      if(targetRow < 0 || targetRow >= ROW_COUNT){
        continue;
      }
      if(targetCol < 0 || targetCol >= COL_COUNT){
        continue;
      }
      tiles[blankRow][blankCol] = tiles[targetRow][targetCol];
      tiles[targetRow][targetCol] = -1;
      blankRow = targetRow;
      blankCol = targetCol;
      if(!--count) {
        break;
      }
    }
  }

  if(!canvas.getContext) {
    alert('Canvas not supported...');
    return;
  }
  context = canvas.getContext('2d');

  image = document.createElement('img');
  image.src = IMAGE_URL;
  image.addEventListener('load', function() {
    initTiles();
    moveBlank(moveCount);
    drawPuzzle();
  });

    canvas.addEventListener('click', function(e) {
      let x, y;
      let rect;
      let row, col;
      let i;
      let targetRow, targetCol;

      rect = e.target.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      row = Math.floor(y / TILE_HEIGHT);
      col = Math.floor(x / TILE_WIDTH);
      if(tiles[row][col] === -1) {
        return;
      }
      // console.log(row, col);

      for (i = 0; i < UDLR.length; i++) {
         targetRow = row + UDLR[i][1];
         targetCol = col + UDLR[i][0];
         if (targetRow < 0 || targetRow >= ROW_COUNT) {
           continue;
         }
         if (targetCol < 0 || targetCol >= COL_COUNT) {
           continue;
         }
         if (tiles[targetRow][targetCol] === -1) {
           tiles[targetRow][targetCol] = tiles[row][col];
           tiles[row][col] = -1;
           drawPuzzle();
           if(checkResult()) {
             alert('GAME CLEAR!');
           }
           break;
         }
      }
    });
})();
