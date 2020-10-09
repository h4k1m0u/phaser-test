// https://labs.phaser.io/edit.html?src=src/physics/arcade/bullets%20group.js&v=3.24.1
import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, direction) {
    super(scene, x, y, 'bullet');
    this.direction = direction;

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

    // hide & deactivate after once outside canvas
    if (this.x < 0 || this.x > this.scene.width) {
      this.setVisible(false);
      this.setActive(false);
    }
  }

  fire(x, y, direction) {
    // add sprite to scene
    this.body.setAllowGravity(false);
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);

    // move & animate bullet
    this.setVelocityX((direction === 'right') ? 300 : -300);
    this.anims.play('anim-bullet', false);
  }
}

export default Bullet;
