const Game = require("./game");
const GameView = require("./game_view");
const Util = require("./util");

document.addEventListener("DOMContentLoaded", () => {
  let started = false;
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 400;
  canvasEl.height = 850;

  const ctx = canvasEl.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.clearRect(0,0, 400, 850);
  ctx.fillStye = "black";
  ctx.fillRect(0,0, 400, 850);
  // ctx.font = 'normal 35px Montserrat';
  // ctx.fillStyle = 'white';
  // ctx.fillText("Click to Start", 100, 400);
  Util.drawText(ctx, 200, 625- 15, 12, 'yellow', 4);
  for (let i=0; i < 4; i++) { 
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(200, 625 + (i * 22), 10, 0, Math.PI * 2, true);
    ctx.fill();
  }
  const game = new Game();
  document.getElementById("restart").addEventListener('click', () => {
    
    game.reset();
    // delete game;
    ctx.clearRect(0,0, 400,850);
    const canvas = document.getElementById('game-canvas');
    const ctx1 = canvas.getContext('2d');
    ctx1.clearRect(0,0, 400, 850);
    const game1 = new Game();
    new GameView(game1, ctx1).start();
    
  });
  
  let _start = function() {
    
  };

  document.getElementById("gameplay").addEventListener("mouseover", function () {
    document.getElementById("canvas-overlay").style.display = "none";
  });

  document.getElementById("gameplay").addEventListener("mouseout", function () {
    if (!started) {
      document.getElementById("canvas-overlay").style.display = "block";
    }
  });


  document.getElementById("canvas-overlay").addEventListener('click', function start() {
    started = true;
    document.getElementById('canvas-overlay').style.display = "none";
    new GameView(game, ctx).start();
    document.getElementById("canvas-overlay").removeEventListener('click', start, true);
    document.getElementById("game-canvas").removeEventListener('click', start, true);
  }, true);

  document.getElementById("game-canvas").addEventListener('click', function start() {
    started = true;
    document.getElementById('canvas-overlay').style.display = "none";
    new GameView(game, ctx).start();
    document.getElementById("game-canvas").removeEventListener('click', start, true);
  }, true);





});


