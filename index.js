const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.8

class Sprite {
    constructor({ position, velocity, leftSide, color = 'red', offset }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.color = color
        this.height = 60
        this.lastKey
        this.color = color
        this.leftSide = leftSide
        this.isAttacking = false
        this.attackBox = {
            position:
            {
                x: this.position.x,
                y: this.position.y,
            },
            offset
        }
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // if (this.isAttacking) {
        c.fillStyle = 'white'
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        )
        //  }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: {
                x: this.position.x,
                y: this.position.y
            }
        }
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}


const player = new Sprite({
    position: { x: 0, y: 10 }, velocity: { x: 0, y: 0 }, leftSide: false, color: 'red',
    offset: {
        x: 0,
        y: 0
    }
})

player.draw()

const enemy = new Sprite({
    position: { x: 400, y: 100 }, velocity: { x: 0, y: 0 }, leftSide: true, color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})

enemy.draw()


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
}
let lastKey

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    if (keys.a.pressed && (lastKey === 'a' || lastKey === 'w' || lastKey === 's')) {
        player.velocity.x = -6
    } else if (keys.d.pressed && (lastKey === 'd' || lastKey === 'w' || lastKey === 's')) {
        player.velocity.x = 6
    }

    if (keys.ArrowLeft.pressed && (lastKey === 'ArrowLeft' || lastKey === 'ArrowUp' || lastKey === 'ArrowDown')) {
        enemy.velocity.x = -6

    } else if (keys.ArrowRight.pressed && (lastKey === 'ArrowLeft' || lastKey === 'ArrowUp' || lastKey === 'ArrowDown')) {
        enemy.velocity.x = 6
    }

    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking
    ) {
        player.isAttacking = false;
        console.log('life --')
    }
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            player.leftSide = false
            break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            player.leftSide = true
            break

        case 'w':
            keys.w.pressed = true
            player.lastKey = 'w'
            player.velocity.y = -10
            break

        case 's':
            keys.s.pressed = true
            player.lastKey = 's'
            player.velocity.y = 5
            break

        case 'e':
            player.attack()
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            enemy.leftSide = true
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            enemy.leftSide = false
            break

        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            enemy.lastKey = 'ArrowUp'
            enemy.velocity.w = -10
            break

        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            enemy.lastKey = 'ArrowDown'
            enemy.velocity.w = 5
            break
        case 'Enter':
            enemy.attack()
            break
    }
})


window.addEventListener('keyup', (event) => {
    console.log(event)
    lastKey = event.key
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            player.lastKey = 'd'
            break

        case 'a':
            keys.a.pressed = false
            player.lastKey = 'a'
            break

        case 'w':
            keys.w.pressed = false
            player.velocity.y = -15
            player.lastKey = 'w'
            break

        case 's':
            keys.s.pressed = false
            player.velocity.y = 6
            player.lastKey = 's'
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowLeft'
            break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            enemy.velocity.y = -15
            enemy.lastKey = 'ArrowUp'
            break

        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            enemy.velocity.y = 6
            enemy.lastKey = 'ArrowDown'
            break
    }
})