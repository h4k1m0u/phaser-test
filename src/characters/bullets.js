// https://labs.phaser.io/edit.html?src=src/physics/arcade/bullets%20group.js&v=3.24.1
import { Physics } from 'phaser';
import Bullet from './bullet';

class Bullets extends Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.setName('Bullets');

    this.createMultiple({
      classType: Bullet,
      quantity: 15,
      key: 'bullet',
      active: false,
      visible: false,
      setXY: {
        x: -100,
        y: -100,
      }
    });
  }

  fire(x, y, toRight) {
    // recycle same bullets
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, toRight);
    }
  }
}

export default Bullets;
