// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * (-100 + 1500) - 1500;
    this.y = y;
    this.speed = Math.random() * (220 - 70) + 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x > 500){
      this.x = -100;
    }
    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function() {
  if(Math.abs(player.y - this.y) < 50 && Math.abs(player.x - this.x) < 50 ){
    player.handleInput('reset');
  }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = 'images/char-horn-girl.png';
  this.x = x;
  this.y = y;
}

Player.prototype.update = function() {
  if (this.y > 5 * 83) {
    this.y = 5 * 83
  }
  if (this.y < 0) {
    this.y = 5 * 83
  }
  if (this.x < 0) {
    this.x = 0
  }
  if (this.x > 4 * 101) {
    this.x = 4 * 101
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  if (key === 'left') {
    this.x -= 101;
  }
  if (key === 'right') {
    this.x += 101;
  }
  if (key === 'up') {
    this.y -= 85;
  }
  if (key === 'down') {
    this.y += 85;
  }
  if (key=== 'reset') {
    player.x = 2 * 101;
    player.y= 5 * 83;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy(1 * 75);
var bug2 = new Enemy(2 * 75);
var bug3 = new Enemy(3 * 75);
var bug4 = new Enemy(1 * 75);
var bug5 = new Enemy(2 * 75);
var bug6 = new Enemy(3 * 75);

var allEnemies = [bug1, bug2, bug3, bug4, bug5, bug6];
var player = new Player(2 * 101, 5 * 83);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
