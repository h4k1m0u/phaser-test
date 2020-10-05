// https://labs.phaser.io/edit.html?src=src/physics/arcade/bullets%20group.js&v=3.24.1
import Phaser from 'phaser';
import Bullet from './bullet';

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Bullet,
      quantity: 15,
      key: 'bullet',
      active: false,
      visible: false,
    });
  }

  fire(x, y, direction) {
    // recycle same bullets
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, direction);
    }
  }
}

export default Bullets;
