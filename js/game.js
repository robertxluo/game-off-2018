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

// Load asset files for our game
gameScene.preload = function () {
  this.load.image('background', '../assets/background.png');
  this.load.image('player', '../assets/player.png');
  this.load.image('dragon', '../assets/dragon.png');
  this.load.image('treasure', '../assets/treasure.png');  
};

// Executed once, after assets were loaded
gameScene.create = function() {

  // Background
  let bg = this.add.sprite(0, 0, 'background');

  // Change origin to top-left of the sprite
  bg.setOrigin(0,0);


  // Player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
 
  // Scale down
  this.player.setScale(0.5);
}