// Global Variables
var enemyStartX = -100;
var enemyEndX = 550;
var translateX = 101;
var translateY = 82;
var totalScore = 0;
var allEnemies = [];
var enemyCount = 5;




var Enemy = function() {
  //sets initial run of Enemy
  this.enemySpawn();
}




Enemy.prototype.update = function(dt) {
  //repeats initial run
  this.x += this.speed * dt;
  if (this.x > enemyEndX) {
    this.enemySpawn();
  };
}




Enemy.prototype.enemySpawn = function() {
  this.x = enemyStartX;
  //yRange contains Y coordinates based on each of the road blocks
  this.yRange = [211, 129, 47];
  this.y = this.yRange[Math.floor(Math.random() * 3)];
  this.speed = 150 * Math.random() + 100;
  this.sprite = 'images/enemy-bug.png';
}




Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}




var Player = function() {
  //starting location
  this.playerSpawn();
}




Player.prototype.playerSpawn = function() {
  //reset to starting location
  this.x = 205;
  this.y = 375;
  this.sprite = 'images/char-boy.png';
}




Player.prototype.update = function() {
  //simply executes checkCollisions function
  this.endGame();
  this.checkCollisions();
}




Player.prototype.addScore = function() {
  //adds 1 to the total score
  totalScore += 1;
  document.getElementById("score").innerHTML = "Score: " + totalScore;
}




Player.prototype.endGame = function() {
  if (this.y <= 0) {
    this.playerSpawn();
    this.addScore();
  };
}




Player.prototype.checkCollisions = function() {
  if (this.y >= 40 && this.y <= 220) {
    // player is on road rows, check collisions
    var self = this;
    // loop through each bug
    allEnemies.forEach(function(bug) {
      // is the bug on the same row as the player?
      if (bug.y == self.y) {
        // is the bug on the player?
        if (bug.x >= self.x - 40 && bug.x <= self.x + 40) {
          self.playerSpawn();
        };
      };
    });
  };
}




Player.prototype.handleInput = function(keyup) {
  //direct player with directional buttons

  if (keyup == 'left' && this.x >= 10) {
    this.x -= translateX;
  } else if (keyup == 'right' && this.x <= 400) {
    this.x += translateX;
  } else if (keyup == 'up') {
    this.y -= translateY;
  } else if (keyup == 'down' && this.y <= 370) {
    this.y += translateY;
  };
}




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




// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies.
for (var i = 1; i <= enemyCount; i++) {
  //creates new Enemy
  allEnemies.push(new Enemy());
}




var player = new Player(); // Global Variables