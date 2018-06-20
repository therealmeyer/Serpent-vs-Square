const Util = require("./util");
const MovingObject = require("./moving_object");

class Score extends MovingObject {
  constructor(options = {}) {
    options.vel = [0,0]
    options.pos = [370, 10]
    super(options);
    this.score = 0;
    // debugger;
  }

  increment(num) {
    this.score += num;
  }

  draw(ctx) {
    // debugger;
    Util.drawText(ctx, 370, 10, 'white', this.score);
  }
}

module.exports = Score;