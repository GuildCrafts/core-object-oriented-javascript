// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xLimit = [0, 400];
    this.yLimit = [60, 305];
    this.speed = Math.floor(Math.random() * 350) + 25

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset()
};

Enemy.prototype = {
    constructor: Enemy,
    render: function() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },

    update: function(dt) {
        this.x = this.x + (this.speed * dt)
        if (this.x >= 490){
            this.reset()
        }



    },
        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
        // You should multiply any movement by the dt parameter\
        // which will ensure the game runs at the same speed for
        // all computers.
    reset: function(){
        this.x = 0;
        this.yValues = [ 65, 145, 225, 305 ];
        this.y = this.yValues[Math.floor(Math.random() * 4) ];

    }


}


// Now write your own player class
var Player = function(){
    this.xLimit = [0, 400]
    this.yLimit = [24, 425]
    this.sprite = 'images/char-boy.png';
    this.restart();
};
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype = {
    constructor: Player,
    render: function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    update: function(dt) {
        this.checkCollisions()

    },
    handleInput: function(allowedKeys){
        if(allowedKeys == 'left'){
            this.x = (this.x > this.xLimit[0]) ?  this.x -= 100: this.x
        } else if(allowedKeys == 'right'){
            this.x = (this.x < this.xLimit[1]) ?  this.x += 100: this.x
        } else if(allowedKeys == 'up'){
            this.y  = (this.y > this.yLimit[0]) ? this.y -= 100: this.y
            if(this.y < 25){
                this.restart()
            }
        } else if(allowedKeys == 'down'){
            this.y  = (this.y < this.yLimit[1]) ? this.y += 100: this.y
        }


    },
    checkCollisions: function(){
        console.log('player x value', player.x)
        console.log('player y value', player.y)
        //
        // if(player.y < 25 && allowedKeys === 'up'){
        //     Player.restart()
        // }

    },
    restart: function(){
        this.x = 200;
        this.y = 425;
    },


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
    player.checkCollisions(allowedKeys[e.keyCode]);
});


// Now instantiate your objects.
var enemy1 = new Enemy()
var enemy2 = new Enemy()
var enemy3 = new Enemy()
// Place all enemy objects in an array called allEnemies
var allEnemies = [ enemy1, enemy2, enemy3 ];

// Place the player object in a variable called player
var player = new Player()
player.render()
