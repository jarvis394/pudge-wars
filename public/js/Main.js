const P_WIDTH = 487
const P_HEIGHT = 357

// Players on server
let players = {}

// Create socket and conect
let socket = io()

// Scale multiplier
let pMult = .25

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  clear()
  background(255)

  if (keyIsDown(87)) players[socket.id].move(0, -10)
  if (keyIsDown(83)) players[socket.id].move(0, 10)
  if (keyIsDown(65)) players[socket.id].move(-10, 0)
  if (keyIsDown(68)) players[socket.id].move(10, 0)

  for (let i in players) {
    players[i].draw()

    // Oh... that's me?
    if (i === socket.id && players[socket.id]) {

      // Update our location
      socket.emit("update", {
        x: players[socket.id].pos.x,
        y: players[socket.id].pos.y
      })
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}