import Phaser from 'phaser';
import MainScene from './scenes/main';
import './scss/style.scss';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: '#51a8ff',
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
