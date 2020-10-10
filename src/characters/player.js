import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textures) {
    super(scene, x, y, textures.static_right);
    this.direction = 'right';
    this.textures = textures;

    // add sprite to scene & attach body to it
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // this.setCollideWorldBounds(true);

    // player animations
    scene.anims.create({
      key: 'anim-player-left',
      frames: scene.anims.generateFrameNumbers(textures.left, { start: 0, end: 9 }),
      frameRate: 10,
      repeat: 0,
    });
    scene.anims.create({
      key: 'anim-player-right',
      frames: scene.anims.generateFrameNumbers(textures.right, {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });
    scene.anims.create({
      key: 'anim-player-jump-left',
      frames: scene.anims.generateFrameNumbers(textures.jump_left, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });
    scene.anims.create({
      key: 'anim-player-jump-right',
      frames: scene.anims.generateFrameNumbers(textures.jump_right, { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });
  }

  stop() {
    this.setVelocityX(0);

    if (this.direction === 'left') {
      this.setTexture(this.textures.static_left);
    } else if (this.direction === 'right') {
      this.setTexture(this.textures.static_right);
    }
  }

  moveLeft() {
    this.setVelocityX(-150);
    this.anims.play('anim-player-left', true);
    this.direction = 'left';
  }

  moveRight() {
    this.setVelocityX(150);
    this.anims.play('anim-player-right', true);
    this.direction = 'right';
  }

  jump() {
    this.setVelocityY(-200);
    this.direction = 'up';
    this.anims.play((this.texture.key.endsWith('left')) ? 'anim-player-jump-left' : 'anim-player-jump-right', false);
  }
}

export default Player;
