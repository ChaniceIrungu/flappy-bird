import Phaser from "phaser";

const config = {
  //WebGL(Web graphics library) Js Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  //interaction of your objects/ how gravity/velocity of object is computed
  physics: {
    //Arcade physics plugin, manages physics simulations
    default: "arcade",
  },
  //what you display
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

//loading assets such as images, music, animations ...
function preload() {
  //this context is scene containing functions and properties you can use
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}

let bird = null;
// initializing instances of the object on screen/ memory
function create() {
  //x-400, y-300, key of image
  this.add.image(0, 0, "sky").setOrigin(0, 0);
  //game object that has more properties you can play with
  bird = this.physics.add
    .sprite(config.width / 10, config.height / 2, "bird")
    .setOrigin(0);
  //gravity increases per second while velocity remains constant
  bird.body.gravity.y = 200;
  debugger;
}

//60 frames per second fps/ 60 times per second
function update(time, delta) {}

new Phaser.Game(config);
