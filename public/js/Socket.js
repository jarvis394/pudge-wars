function connectToServer() {
  let nick = document.getElementById("nick").value
  let player = {
    id: socket.id,
    x: floor(random(windowWidth)),
    y: floor(random(windowHeight)),
    nick: nick,
    hooking: false
  }

  socket.emit("start", player)
  document.getElementById("menu").style.display = "none"
  document.getElementById("nickInput").classList += " is-loading"

  console.log("> %c[LOG] %cTrying to connect...", styles.log, styles.default)
}

function updatePlayersCount() {
  document.getElementById("playersCount").innerHTML = "<h3>Players: " + Object.keys(players).length + "</h3>"
}

// Starting a game
socket.on("start", (data) => {
  console.log("> %c[LOG] %cStarted playing with players: ", styles.log, styles.default)

  for (let i in data.players) {
    let player = data.players[i]
    players[player.id] = new Player(player)

    console.log("        - %c" + player.nick + "%c: " + JSON.stringify(player), styles.highlight, styles.default)
  }

  document.getElementById("playersCount").style.display = ""
  updatePlayersCount()

  started = true
})

// Adding a player
socket.on("addPlayer", (data) => {
  if (data.id === socket.id) return

  players[data.id] = new Player(data)
  console.log("> %c[LOG] %cAdded player: %c" + data.id, styles.log, styles.default, styles.highlight)
  
  updatePlayersCount()
})

// Removing a player
socket.on("removePlayer", id => {
  delete players[id]
  console.log("> %c[LOG] %cRemoved player: %c" + id, styles.log, styles.default, styles.highlight)

  updatePlayersCount()
})

// Updating the world
socket.on("heartbeat", data => {
  for (let id in data.players) {
    if (id !== socket.id && players[id]) {
      players[id].pos.x = data.players[id].x
      players[id].pos.y = data.players[id].y
      players[id].hooking = data.players[id].hooking
    }
  }
})