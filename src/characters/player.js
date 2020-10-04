import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textures) {
    super(scene, x, y, textures.static);

    // add sprite to scene & attach body to it
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    // player animations
    scene.anims.create({
      key: 'anim-left',
      frames: scene.anims.generateFrameNumbers(textures.left, { start: 0, end: 9 }),
      frameRate: 10,
      repeat: 0,
    });
    scene.anims.create({
      key: 'anim-right',
      frames: scene.anims.generateFrameNumbers(textures.right, {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });
    scene.anims.create({
      key: 'anim-jump',
      frames: scene.anims.generateFrameNumbers(textures.jump, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });
  }

  stop() {
    this.setVelocityX(0);
  }

  moveLeft() {
    this.setVelocityX(-150);
    this.anims.play('anim-left', true);
  }

  moveRight() {
    this.setVelocityX(150);
    this.anims.play('anim-right', true);
  }

  jump() {
    this.setVelocityY(-100);
    this.anims.play('anim-jump', false);
  }
}

export default Player;
