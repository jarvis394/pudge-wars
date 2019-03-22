/**
 * Player object
 */
class Player {
  constructor(player) {
    this.pos = createVector(player.x, player.y)
    this.nick = player.nick
    this._img = loadImage('res/pudge_v2.png')

    this.hooking = player.hooking
  }

  draw() {
    text(this.nick, this.pos.x + (P_WIDTH * pMult) / 2 - 20, this.pos.y - 8)
    image(this._img, this.pos.x, this.pos.y, P_WIDTH * pMult, P_HEIGHT * pMult)
  }

  hook() {
    this.hooking = !this.hooking
  }

  /**
   * Moves player
   * @param {Number} x X-cord
   * @param {Number} y Y-cord
   */
  move(x, y) {
    this.pos.x += x
    this.pos.y += y
  }
}