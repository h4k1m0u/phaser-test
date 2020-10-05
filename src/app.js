import Phaser from 'phaser';
import MainScene from './scenes/main';

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: [
    MainScene,
  ],
  // use arcade physics engine
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
      },
    },
  },
  fps: {
    min: 30,
    target: 30,
  },
};

const game = new Phaser.Game(config);
