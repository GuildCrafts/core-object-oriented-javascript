var Bug = function(x, y, sprite, speed) {
    this.xConstant = 51;
    this.yConstant = 32;
    this.x = x;
    this.y = y;
  }
  // Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  //   this.speed = speed || 1;
  //   Bug.call(this, x, y, speed);
};

// Update the enemy's position, required method for game
var enemy
  // Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  //   // all computers.
  //   if (this.x >= 4) {
  //     this.x = 0;
  //   } else {
  //     this.x += this.speed * dt;
  //   }
  //   this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
  this.sprite = 'images/char-boy.png';
  //   this.speed = speed || 1;
  //   Bug.call(this, x, y, speed);
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

Player.prototype.handleInput = function(e) {
  if (e === 'left' && this.x > 0) {
    this.x -= 50
  } else if (e === 'right' && this.x < 400) {
    this.x += 50 //shorthand for this.x = this.x + 50
  } else
  if (e === 'down' && this.y > 0) {
    this.y -= 50
  } else if (e === 'up') {
    if (this.y < 0) {
      this.reset()
    } else {
      this.y -= 50
    }
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  //   // all computers.
  //   if (this.x >= 4) {
  //     this.x = 0;
  //   } else {
  //     this.x += this.speed * dt;
  //   }
  //   this.render();
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = []



// Place the player object in a variable called player
var allPlayers = []
while (allEnemies.length < 3) {

  allEnemies.push(new Enemy())
}


var player = new Player() //create new player

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});