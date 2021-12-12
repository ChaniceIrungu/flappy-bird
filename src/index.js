import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
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
let bird = null;
let totaDelta = null;

function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0);

  bird = this.physics.add
    .sprite(config.width / 10, config.height / 2, "bird")
    .setOrigin(0);

  this.input.on("pointerdown", function () {
    console.log("pressing mouse button!");
  });
  this.input.keyboard.on("keydown_SPACE", function () {
    console.log("pressing space button!");
  });
}

//if bird position x is same or larger than width of canvas go back to the left
//if bird position x is same or smaller or equal to 0 then move back to the right
function update(time, delta) {}

new Phaser.Game(config);
