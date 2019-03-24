const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const colors = require("colors")

// Config file
const config = require("./config")


// Players on server
let players = {}

/** 
 * Send heartbeat data to players
 */
function heartbeat() {
  // if (!players.length) return

  io.sockets.emit("heartbeat", {
    players: players
  })
}

// Heartbeat
setInterval(() => heartbeat(), 0)

io.sockets.on('connection', socket => {

  console.log(">", "[LOG]".green, "New client:", `${socket.id}`.gray)

  // Send to socket info about players to create 'Player' objects
  socket.on("start", player => {
    players[socket.id] = player
    console.log(">", "[LOG]".green, "New player:", `${player.nick}`.gray)

    socket.emit('start', {
      players: players
    })

    io.sockets.emit("addPlayer", players[socket.id])
  })

  socket.on("update", data => {
    if (!players[socket.id]) return

    players[socket.id].x = data.x
    players[socket.id].y = data.y
  })

  // Socket disconnects
  socket.on('disconnect', (reason) => {

    // Remove player
    delete players[socket.id]

    // Say that to sockets
    io.sockets.emit("removePlayer", socket.id)

    console.log(">", "[LOG]".red, "Client".gray, `${socket.id}`, "disconnected by:".gray, reason)
  })

})


// ROUTING //

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

// Listen on port
http.listen(config.PORT, () => {
  console.log('>', '[SERVER]'.yellow, 'Listening on port', "4000".gray);
});