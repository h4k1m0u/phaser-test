import Phaser from 'phaser';

// import images
import pathImageSky from './images/sky.png';
import pathImageStar from './images/star.png';

function preload() {
  this.load.image('sky', pathImageSky);
  this.load.image('star', pathImageStar);
}

function create() {
  this.add.image(400, 300, 'sky');
  this.add.image(200, 200, 'star');
}

function update() {
}

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
