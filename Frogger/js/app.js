// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'
    this.x = x
    this.y = y
    this.speed = speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt
    if (this.x > 505) {
        this.x = 0
    }
    checkCollision(this)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.sprite = 'images/Rock.png'
    this.x = x
    this.y = y
    this.speed = speed
}

Player.prototype.update = function () {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function (input) {
    if (input === 'left') {
        player.x -= player.speed;
    }
    if (input === 'up') {
        player.y -= player.speed - 20;
    }
    if (input === 'right') {
        player.x += player.speed;
    }
    if (input === 'down') {
        player.y += player.speed - 20;
    }
}

var Stage = function () {

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []
let counter = 1
var player = new Player(202.5, 383, 50)
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)
var enemy2 = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)
var enemy3 = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)
var enemy4 = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256)
allEnemies.push(enemy)
allEnemies.push(enemy2)
allEnemies.push(enemy3)
allEnemies.push(enemy4)

var checkCollision = function (theEnemy) {
    if (
        player.y + 131 >= theEnemy.y + 90 &&
        player.x + 25 <= theEnemy.x + 88 &&
        player.y + 73 <= theEnemy.y + 135 &&
        player.x + 76 >= theEnemy.x + 11) {
        player.x = 202.5
        player.y = 383
        console.log('Hit Counter: ' + counter)
        counter++
    }

    // Keeps character in map boundaries
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});