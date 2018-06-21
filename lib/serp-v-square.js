const Game = require("./game");
const GameView = require("./game_view");
const Util = require("./util");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 400;
  canvasEl.height = 850;

  const ctx = canvasEl.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.clearRect(0,0, 400, 850);
  ctx.fillStye = "black";
  ctx.fillRect(0,0, 400, 850);
  ctx.font = 'normal 35px Montserrat';
  ctx.fillStyle = 'white';
  ctx.fillText("Click to Start", 100, 400);
  Util.drawText(ctx, 200, 625- 15, 12, 'yellow', 4);
  for (let i=0; i < 4; i++) { 
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(200, 625 + (i * 22), 10, 0, Math.PI * 2, true);
    ctx.fill();
  }

  document.getElementById("restart").addEventListener('click', () => {
    const game = new Game();
    new GameView(game, ctx).start();
  });
    
  document.getElementById("game-canvas").addEventListener('click', () => {
    const game = new Game();
    new GameView(game, ctx).start();
  });

});


