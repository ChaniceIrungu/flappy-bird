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
const PIPES_TO_RENDER = 500;
let flapVelocity = 250;

let bird = null;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

let upperPipe = null;
let lowerPipe = null;
let pipeHorizontalDistance = 0;
const pipeVerticalDistanceRange = [100, 200];

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

function create() {
  this.add.image(0, 0, "sky").setOrigin(0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, "bird")
    .setOrigin(0);
  bird.body.gravity.y = 400;

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    pipeHorizontalDistance += 300;
    let pipeVerticalDistance = Phaser.Math.Between(
      ...pipeVerticalDistanceRange
    );
    let pipeVerticalPosition = Phaser.Math.Between(
      0 + 20,
      config.height - 20 - pipeVerticalDistance
    );
    upperPipe = this.physics.add
      .sprite(pipeHorizontalDistance, pipeVerticalPosition, "pipe")
      .setOrigin(0, 1);

    lowerPipe = this.physics.add
      .sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, "pipe")
      .setOrigin(0, 0);
    upperPipe.body.velocity.x = -200;
    lowerPipe.body.velocity.x = -200;
  }

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
