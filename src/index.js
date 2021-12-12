import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
    },
  },

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}

const VELOCITY = 200;

let flapVelocity = 250;
let bird = null;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, "bird")
    .setOrigin(0);

  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown_SPACE", flap);
}

//if bird position y is smaller than 0 or greater that height of the canvas then alert "you have lost"
function update(time, delta) {
  if (bird.y < 0 - bird.height || bird.y > config.height) {
    restartBirdPosition();
  }
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
