const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.8

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 10
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player.draw()

const enemy = new Sprite({
    position: { x: 400, y: 100 }, velocity: { x: 0, y: 0 }
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
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
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

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
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