var Enemy = function(x, y) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.enemySpeed = Math.floor((Math.random() * 200) + 100);
};

Enemy.prototype.update = function(dt) {
  if (this.x <= 600) {
    this.x += this.enemySpeed * dt
  } else {
    this.x = -100
  }
};


Object.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = "30px Verdana";
  ctx.fillStyle = 'magenta';
  ctx.fillText("Points: " + player.points,55,575)
  ctx.fillText("Lives: " + player.lives,340,575)
  if (player.lives === 0) {
    ctx.font = "60px Verdana";
    ctx.fillStyle = 'magenta';
    ctx.fillText("Womp womp",50,275);
    setTimeout(function() {
      window.location.reload()
    }, 2000);
  }
  if (player.points === 5) {
    ctx.font = "60px Verdana";
    ctx.fillStyle = 'magenta';
    ctx.fillText("Yay! You win!",50,275);
    setTimeout(function() {
      window.location.reload()
    }, 2000);
  }
};


var Player = function(x, y) {
  this.sprite = 'images/char-pink-girl.png';
  this.x = x;
  this.y = y;
  this.lives = 3;
  this.points = 0;
};

Player.prototype.update = function() {
  if (this.y <= -15) {
    this.reset();
    this.points++;
  }
  for (i = 0; i < allEnemies.length; i++) {
    if (Math.abs(this.x - allEnemies[i].x) < 30) {
      if (Math.abs(this.y - allEnemies[i].y) < 30) {
        this.reset();
        this.lives--;
      }
    }
  }
};

Player.prototype.handleInput = function(e) {
  if (e === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (e === 'right' && this.x < 400) {
    this.x += 101;
  } else if (e === 'down' && this.y < 350) {
    this.y += 80;
  } else if (e === 'up') {
    this.y -= 80;
  }
};

Player.prototype.reset = function() {
  this.y = 390;
  this.x = 200;
}


var allEnemies = [];
allEnemies.push(new Enemy(-300, 215));
allEnemies.push(new Enemy(-300, 135));
allEnemies.push(new Enemy(-300, 60));
allEnemies.push(new Enemy(-300, 215));
allEnemies.push(new Enemy(-300, 135));
allEnemies.push(new Enemy(-300, 60));

var player = new Player(200, 390);


document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
