const keyCodes = {
  left: [-3, 0],
  right: [3, 0]
};

const pauseButton = document.getElementById("pausebtn");
// console.log(pauseButton);

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.serpent = this.game.addSerpent();
    this.keys = Object.create(null);
    // window.addEventListener('keydown', this.bindKeyHandlers);
    this.gameStarted = false;
    // console.log(pauseButton);
    this.paused = false;
    pauseButton.addEventListener('click', this.togglePlay.bind(this));

    window.addEventListener('keyup', this.resetSerp.bind(this));
    this.resetSerp = this.resetSerp.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  bindKeyHandlers() {
    // if (!e) return;
    const serpent = this.serpent;
    Object.keys(keyCodes).forEach((k) => {
      const move = keyCodes[k];
      key(k, () => { serpent.power(move); });
    });
    // debugger;
    // if (keyCodes.hasOwnProperty(e.keyCode)) {
    //   e.preventDefault();
    //   serpent.power(keyCodes[e.keyCode]);
    // }

  }

  togglePlay() {
    debugger;
    if (!this.gameStarted) {
      return;
    }
    this.paused = !this.paused;
    if (!this.paused) {
      this.animate(this.lastTime-100);
    }
  }

  resetSerp() {
    // debugger;
    this.serpent.resetVel();
  }

  restart() {

  }

  start() {
    this.gameStarted = true;
    if (!this.paused) {
      this.bindKeyHandlers();
      this.lastTime = 0;
      requestAnimationFrame(this.animate.bind(this));
    } 
  }

  animate(time) {
    if (this.serpent.length <= 0) {
      this.ctx.globalAlpha = 0.6;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 400, 850);
      this.ctx.globalAlpha = 1.0;
      this.ctx.font = 'normal 35px Montserrat';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Game Over', 110, 500);
      this.ctx.font = 'normal 35px Montserrat';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`Your Score: ${this.game.score}`, 90, 550);
      // this.ctx.font = 'normal 30px FontAwesome';
      // this.ctx.fillStyle = 'white';
      // this.ctx.fillText('\uf521', 110, 450);
    }
    else if (!this.paused) {
      const timeDelta = time - this.lastTime;
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}




module.exports = GameView;