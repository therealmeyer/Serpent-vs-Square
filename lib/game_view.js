const keyCodes = {
  left: [-3, 0],
  right: [3, 0]
};

// console.log(pauseButton);
const pauseButton = document.getElementById("pausebtn");

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
    this.time = false;
    
    pauseButton.addEventListener('click', this.togglePlay.bind(this));
 
    this.togglePlay = this.togglePlay.bind(this);

    // this.game.addBlocks();
    // this.game.addCircles();
    // this.game.addLines();
    window.addEventListener('keyup', this.resetSerp.bind(this));
    this.resetSerp = this.resetSerp.bind(this);
    
  }

  bindKeyHandlers() {
    // if (!e) return;
    const serpent = this.serpent;
    Object.keys(keyCodes).forEach((k) => {
      const move = keyCodes[k];
      key(k, () => { 
        serpent.power(move);
      });
    });
    // debugger;
    // if (keyCodes.hasOwnProperty(e.keyCode)) {
    //   e.preventDefault();
    //   serpent.power(keyCodes[e.keyCode]);
    // }

  }

  togglePlay(event) {
    let timeStamp = event.timeStamp;
    // debugger;
    //console.log(this.lastTime);
    //console.log(this.frame);
    this.paused = !this.paused;
    // debugger;
    if (!this.paused) {
      // debugger;
      // this.animate(this.timeStamp);
      // idea: reset this.lastTime
      this.lastTime = timeStamp;
      this.frame = requestAnimationFrame(this.animate.bind(this));
    } else {
      cancelAnimationFrame(this.frame);
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
      this.time = 0;
      this.frame = requestAnimationFrame(this.animate.bind(this));
    } 
  }

  animate(time) {
    // debugger
    this.timeStamp = time;
    if (this.paused) {
      //console.log("im paused");
      return;
    }
    if (this.serpent.length <= 0) {
      this.ctx.globalAlpha = 0.6;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, 400, 850);
      this.ctx.globalAlpha = 1.0;
      this.ctx.font = 'bold 35px Montserrat';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Game Over', 110, 500);
      this.ctx.font = 'bold 35px Montserrat';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`Your Score: ${this.game.score}`, 90, 550);
      // this.ctx.font = 'normal 30px FontAwesome';
      // this.ctx.fillStyle = 'white';
      // this.ctx.fillText('\uf521', 110, 450);
    }
    else if (!this.paused) {

      // debugger;

      // this.serpent.power();
      //console.log("animating things");
      const timeDelta = time - this.lastTime;
      this.game.step(timeDelta, this.paused);
      this.game.draw(this.ctx);
      
      //console.log(this.time);
      if (this.time % 280 === 0 || this.time === 0) {
        this.game.addBlocks();
        this.game.addCircles();
        this.game.addLines();
      }
      this.time += 1;
      this.lastTime = time;
      // console.log(performance.now());
      this.frame = requestAnimationFrame(this.animate.bind(this));
      // console.log(requestAnimationFrame(this.animate.bind(this)));
    } 
  }
}




module.exports = GameView;