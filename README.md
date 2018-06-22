# README

# Serpent VS Square
Serpent VS Square is simple visual game based on two classic games, Snake and Block. An initial snake starts the game, as the goal is to make the snake as large as possible by colliding with circles that extend the length. This must be done while trying to avoid blocks or hit blocks with the smallest number, as the value of the block subtracts from the snake length. Users will use arrow keys in order to control the snake to avoid obstacles. Random blocks and lines are generated for the user to avoid. Score is accumulated based on the number value of blocks the snake can make it through. 
[Serpent-VS-Square Live](https://therealmeyer.github.io/Serpent-vs-Square/)

![Game](https://s3-us-west-1.amazonaws.com/sonicstratus/serp-v-square.png)

## Technologies
* Javascript
* HTML
* CSS

## Features
### Serpent Movement

![Snake](https://s3-us-west-1.amazonaws.com/sonicstratus/serpvsquare.gif)

The movement of the serpent was difficult to emulate. The current method of rendering on Canvas was to have the serpent be at a fixed position and have all other objects have a negative velocity. This would simplify the task of always having the serpent in the center of the screen. However, this presented problems when attempting to emulate the movement of the serpent. Ultimately to solve this problem, an array of the previous positions of the head node was stored, and on each subsequent render the position of the next node was taken from this array based on its index and the velocity of the other objects. This resulted in a smooth flowing snake on change of direction. 

```javascript
  //set most recent position to the serpent position (i.e. head node)
  this.mostPrev = [this.pos[0], this.pos[1]];
  //push x position into array
  this.prevX.unshift(this.pos[0]);
  if (this.prevX.length > 4000) {
    this.prevX.pop();
  }
  //set a most previous index to know where to look in array for points
  this.mostPrevIndex = 1;
  let prevPosX;
  let prevPosY;
  //loop through length of serpent
  for(let i = 0; i < this.length; i++) {
    let index = 0;
    //head node
    if (i === 0) {
      prevPosX = this.pos[0];
      prevPosY = this.pos[1];
    //look at the previous index
    } else {
      index = this.mostPrevIndex;
      prevPosX = this.prevX[index] === undefined ? this.pos[0] : this.prevX[index];
      prevPosY = this.pos[1] + (index);
      //calculate the distance from each point to see if it is 20;
      while (Util.dist([prevPosX, this.pos[1] + index], this.mostPrev ) < 21) {
        prevPosX = this.prevX[index];
        prevPosY = this.pos[1] + (index);
        index += 1;
      }
      //set the previous positions
      this.mostPrev = [prevPosX, prevPosY];
      this.mostPrevIndex = index;
    }
    let node = new SerpentNode({ pos: [prevPosX, prevPosY] });
    node.draw(ctx, i, this.vel);
```

### Collision Detection
![Collisions](https://s3-us-west-1.amazonaws.com/sonicstratus/collisions.gif)

Object collisions and physics of the game were challenging. A `util.js` file was created in order to hand calculations such as distance and velocity. Custom collision detections for each object had to be made because each object was a different shape and each collision resulted in a different effect. The Line collisions were an especially difficult problem as the velocity of the serpent had to be altered and restricted based on both objects respective positions. 

For my implementation, a general collision detection function was placed in my MovingObject Class from which all objects inherit. This function returns a boolean if there is any type of collision. Once any collision is detected, different outcomes must occur based on the types of collisions. This was handled in my Serpent class: 

```javascript
  handleCollision(otherObject) {
    // Circle? Increment snake length
    if (otherObject instanceof Circle) {
      this.length += otherObject.value;
      otherObject.remove();
      return 0;
    // Block? Decrement Snake Length
    } else if (otherObject instanceof Block) {
      if (otherObject.value < this.length) {
        this.length -= otherObject.value;
        otherObject.remove();
        return otherObject.value;
      }
      else {
        let length = this.length;
        this.length -= otherObject.value;
        otherObject.remove();
        return length;
      }
    //Line? Set flags to restrict respective velocities
    } else if (otherObject instanceof Line) {
        if (otherObject.pos[0] > this.pos[0]) {
          this.rightColliding = true;
        } else {
          this.leftColliding = true;
        }
        this.vel = [0,0];
        return 0;
    }
  }
```
The Serpent is the only object that will be colliding with other objects, thus the checks were easiest to implement in this class. This function handles the update of the score.


## Future Plans and Improvements 

- [ ] Improved head-on line collisions
- [ ] Implement simple backend to have high scores
- [ ] Pause on block collisions and decrement snake length and Block value one by one
- [ ] Animate block collisions with explosion/floating particles





