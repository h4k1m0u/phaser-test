// https://labs.phaser.io/edit.html?src=src/physics/arcade/bullets%20group.js&v=3.24.1
import { Physics } from 'phaser';

class Bullet extends Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setName('Bullet');
    this.scene = scene;

    // bullet animation
    scene.anims.create({
      key: 'anim-bullet',
      frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 6 }),
      frameRate: 60,
      repeat: 0,
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // hide & deactivate once outside camera viewport
    const rect = this.scene.cameras.main.worldView;
    if (this.x < rect.x || this.x > rect.x + rect.width) {
      this.disableBody(true, true);
    }
  }

  fire(x, y, toRight) {
    // add sprite to scene
    this.body.setAllowGravity(false);
    this.enableBody(true, x, y, true, true);

    // move & animate bullet
    this.setVelocityX((toRight) ? 300 : -300);
    this.anims.play('anim-bullet', false);
  }
}

export default Bullet;
