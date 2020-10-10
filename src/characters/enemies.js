import Phaser from 'phaser';

class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene, children) {
    super(scene.physics.world, scene, children);

    // animations
    scene.anims.create({
      key: 'anim-enemy-right',
      frames: scene.anims.generateFrameNumbers('enemy-right', {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.playAnimation('anim-enemy-right');
  }

  moveRight() {
    this.setVelocityX(150);
  }
}

export default Enemies;
