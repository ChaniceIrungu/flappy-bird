import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
  },

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const VELOCITY = 200;

let flapVelocity = 250;
let bird = null;

let upperPipe = null;
let lowerPipe = null;
const pipeVerticalDistanceRange = [100, 200];
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);

const initialPipePosition3 = { x: 400, y: config.height * 0.3 };
const initialPipePosition4 = { x: 400, y: -config.height * 0.6 };
let pipe = null;

const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, "bird")
    .setOrigin(0);
  bird.body.gravity.y = 400;

  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown_SPACE", flap);

  upperPipe = this.physics.add.sprite(200, 100, "pipe").setOrigin(0, 1);

  lowerPipe = this.physics.add
    .sprite(200, upperPipe.y + pipeVerticalDistance, "pipe")
    .setOrigin(0, 0);

  pipe = this.physics.add
    .sprite(initialPipePosition3.x, initialPipePosition3.y, "pipe")
    .setOrigin(0);
  pipe = this.physics.add
    .sprite(initialPipePosition4.x, initialPipePosition4.y, "pipe")
    .setOrigin(0);
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
