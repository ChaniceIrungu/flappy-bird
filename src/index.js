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
const PIPES_TO_RENDER = 100;
let flapVelocity = 250;

let bird = null;
let pipes = null;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

let pipeHorizontalDistance = 0;
const pipeVerticalDistanceRange = [100, 200];
const pipeHorizontalDistanceRange = [330, 450];

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

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, "pipe").setOrigin(0, 1);

    const lowerPipe = pipes.create(0, 0, "pipe").setOrigin(0, 0);
    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);

  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown_SPACE", flap);
}

//if bird position y is smaller than 0 or greater that height of the canvas then alert "you have lost"
function update(time, delta) {
  if (bird.y < 0 - bird.height || bird.y > config.height) {
    restartBirdPosition();
  }
}

//uPipe, and lpipes are the stripes so we dont need them here
function placePipe(uPipe, lPipe) {
  const rightMostX = getRightMostPipe();

  let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  let pipeVerticalPosition = Phaser.Math.Between(
    0 + 20,
    config.height - 20 - pipeVerticalDistance
  );

  let pipeHorizontalDistance = Phaser.Math.Between(
    ...pipeHorizontalDistanceRange
  );
  uPipe.x = rightMostX + pipeHorizontalDistance;
  uPipe.y = pipeVerticalPosition;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
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
