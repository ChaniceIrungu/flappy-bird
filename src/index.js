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
  },
};

//loading assets such as images, music, animations ...
function preload() {
  //this context is scene containing functions and properties you can use
  this.load.image("sky", "assets/sky.png");
}

// initializing instances of the object on screen/ memory
function create() {
  //x-400, y-300, key of image
  this.add.image(0, 0, "sky").setOrigin(0, 0);
}

new Phaser.Game(config);
