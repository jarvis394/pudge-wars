socket.on("start", (data) => {

  for (let i in data.players) {
    let player = data.players[i]
    players[player.id] = new Player(player)
  }

  console.log("> [LOG] Started playing with players: ", players)

})

socket.on("addPlayer", (data) => {
  players[data.id] = new Player(data)
})

socket.on("removePlayer", id => {
  if (players[id]) {
    delete players[id]
    console.log("> [LOG] Removed player: " + id)
  }
})

socket.on("heartbeat", data => {

  // Update
  for (let id in data.players) {
    if (id !== socket.id && players[id]) {
      players[id].pos.x = data.players[id].x
      players[id].pos.y = data.players[id].y
      players[id].hooking = data.players[id].hooking
    }
  }

})