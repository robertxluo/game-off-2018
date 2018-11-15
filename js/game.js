// Create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// Our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: gameScene
}

// Create the game, and pass it the configuration
let game = new Phaser.Game(config);

gameScene.init = function () {
  this.playerSpeed = 1.5;
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
}

// Load asset files for our game
gameScene.preload = function () {
  // this.load.image('background', '../assets/background.png');
  this.load.image('player', '../assets/player.png');
  this.load.image('dragon', '../assets/dragon.png');
  this.load.image('treasure', '../assets/treasure.png');
};

// Executed once, after assets were loaded
gameScene.create = function () {

  // Background
  // let bg = this.add.sprite(0, 0, 'background');

  // Change origin to top-left of the sprite
  // bg.setOrigin(0, 0);

  // Player
  this.player = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'player');

  // Scale down player
  this.player.setScale(0.5);

  // Goal 
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  // Group of enemies
  this.enemies = this.add.group({
    key: 'dragon',
    repeat: 5,
    setXY: {
      x: 110,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  // Scale down enemies
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // Set speeds
  Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
    enemy.speed = Math.random() * 2 + 1;
  }, this);

  this.isPlayerAlive = true;
}

gameScene.update = function () {
  // If player dead, don't process update function
  if (!this.isPlayerAlive) {
    return;
  }

  // Player movement
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.right.isDown) {
    this.player.x += this.playerSpeed;
  }
  else if (cursors.left.isDown) {
    this.player.x -= this.playerSpeed;
  }
  else if (cursors.down.isDown) {
    this.player.y += this.playerSpeed;
  }
  else if (cursors.up.isDown) {
    this.player.y -= this.playerSpeed;
  }

  // Treasure collision
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameOver();
  }

  // Enemy movement
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {
    enemies[i].y += enemies[i].speed;

    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }

    // Enemy Collision
    // if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
    //   this.gameOver();
    //   break;
    // }
  }
}

// End the game
gameScene.gameOver = function () {
  this.isPlayerAlive = false;

  // Shake the camera
  this.cameras.main.shake(500);

  // Fade camera
  this.time.delayedCall(250, function () {
    this.cameras.main.fade(250);
  }, [], this);

  // Restart game
  this.time.delayedCall(500, function () {
    this.scene.restart();
  }, [], this);
}