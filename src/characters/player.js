import { Physics } from 'phaser';

class Player extends Physics.Arcade.Sprite {
  constructor(scene, x, y, textures) {
    super(scene, x, y, textures.static);
    this.textures = textures;
    this.isJumping = false;

    // add sprite to scene & attach body to it
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // this.setCollideWorldBounds(true);

    // player animations
    scene.anims.create({
      key: 'anim-player-run',
      frames: scene.anims.generateFrameNumbers(textures.run, { start: 0, end: 9 }),
      frameRate: 10,
      repeat: 0,
    });
    scene.anims.create({
      key: 'anim-player-jump',
      frames: scene.anims.generateFrameNumbers(textures.jump, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });
  }

  stop() {
    this.setVelocityX(0);
    if (this.body.velocity.y === 0) {
      this.setTexture(this.textures.static);
    }
  }

  moveLeft() {
    this.setVelocityX(-150);
    this.flipX = true;
    this.anims.play('anim-player-run', true);
  }

  moveRight() {
    this.setVelocityX(150);
    this.flipX = false;
    this.anims.play('anim-player-run', true);
  }

  jump() {
    this.setVelocityY(-200);
    this.anims.play('anim-player-jump', true);
  }
}

export default Player;
