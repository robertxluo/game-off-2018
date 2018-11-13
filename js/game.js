// Create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// Our game's configuration
let config = {
  type: Phaser.AUTO, 
  width: 640,
  height: 360,
  scene: gameScene
}

// Create the game, and pass it the configuration
let game = new Phaser.Game(config);