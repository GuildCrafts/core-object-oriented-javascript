'use strict'

class Enemy {
    constructor(x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed
        this.sprite = 'images/enemy-bug copy.png'
    }
    update(dt) {
        if (this.x <= 500) {
            this.x += this.speed * (dt)
        } else {
            this.reset()
        }
    }
    reset() {
        this.x = -100
        this.y = this.y
    }
    render() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y)
    }
}

let allEnemies = []
let enemy = new Enemy(200, 210, 225) // fifth
allEnemies.push(enemy)
enemy = new Enemy (20, 190, 150) // fourth
allEnemies.push(enemy)
enemy = new Enemy (150, 130, 300) // second
allEnemies.push(enemy)
enemy = new Enemy (10, 75, 85) // first
allEnemies.push(enemy)

class Player {
    constructor(x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed
        this.sprite = 'images/char-slimer.png'
    }
    update() {
        for (let i = 0; i < allEnemies.length; i++) {
            if (Math.abs(this.x - allEnemies[i].x) <= 75) {
                if (Math.abs(this.y - allEnemies[i].y) <= 75) {
                    this.reset()
                }
            }

        }
        if ((this.y - 0) <= 5) {
            this.reset()
        }
    }
    reset() {
        this.x = 200
        this.y = 400
    }
    render() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y)
    }
    handleInput(e) {
        if (e === 'left' && this.x > 0) {
            this.x -= 50
        }
        if (e === 'up' && this.y > 0) {
            this.y -= 50
        }
        if (e === 'right' && this.x < 400) {
            this.x += 50
        }
        if (e === 'down' && this.y < 400) {
            this.y += 50
        }

    }

}

let player = new Player(200, 400, 10)

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode])
})
