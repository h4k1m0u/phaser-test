import { Scene, Input } from 'phaser';
import Player from '../characters/player';
import Bullets from '../characters/bullets';

// import images
import pathImageSky from '../images/sky.png';
import pathImageStar from '../images/star.png';
import pathImagePlatform from '../images/platform.png';

import pathSpritePlayerStaticLeft from '../images/player_static_left.png';
import pathSpritePlayerStaticRight from '../images/player_static_right.png';
import pathSpritePlayerLeft from '../images/player_left.png';
import pathSpritePlayerRight from '../images/player_right.png';
import pathSpritePlayerJumpLeft from '../images/player_jump_left.png';
import pathSpritePlayerJumpRight from '../images/player_jump_right.png';

import pathBullet from '../images/bullet.png';

class MainScene extends Scene {
  constructor(config) {
    super(config);

    // initialize score
    this.score = 0;
  }

  preload() {
    // load images & sprites sheet
    this.load.image('sky', pathImageSky);
    this.load.image('star', pathImageStar);
    this.load.image('platform', pathImagePlatform);

    // player texture & sprite sheets
    this.load.image('player-static-left', pathSpritePlayerStaticLeft);
    this.load.image('player-static-right', pathSpritePlayerStaticRight);
    this.load.spritesheet('player-left', pathSpritePlayerLeft, { spacing: 2, frameWidth: 22, frameHeight: 22 });
    this.load.spritesheet('player-right', pathSpritePlayerRight, { spacing: 2, frameWidth: 22, frameHeight: 22 });
    this.load.spritesheet('player-jump-left', pathSpritePlayerJumpLeft, { spacing: 2, frameWidth: 22, frameHeight: 22 });
    this.load.spritesheet('player-jump-right', pathSpritePlayerJumpRight, { spacing: 2, frameWidth: 22, frameHeight: 22 });

    // bullet sprite sheet
    this.load.spritesheet('bullet', pathBullet, { spacing: 2, frameWidth: 8, frameHeight: 8 });
  }

  create() {
    // background
    this.add.image(400, 300, 'sky');

    // platform
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(200, 200, 'platform');
    this.platforms.create(300, 350, 'platform');
    this.platforms.create(200, 500 - 16, 'platform');

    // main player
    this.player = new Player(this, 100, 100, {
      static_left: 'player-static-left',
      static_right: 'player-static-right',
      left: 'player-left',
      right: 'player-right',
      jump_left: 'player-jump-left',
      jump_right: 'player-jump-right',
    });

    // collision detection for player
    this.physics.add.collider(this.player, this.platforms);

    // bullets
    this.bullets = new Bullets(this, 0, 0, 'bullet');
    // this.physics.add.collider(this.bullet, this.platforms);

    // stars
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // collision detection for stars
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.player, this.stars, (player, star) => {
      star.disableBody(true, true);

      // increment score
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    });

    // score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: 32, fill: '#000' });
  }

  update() {
    // keyboard interactions inside game loop
    const cursors = this.input.keyboard.createCursorKeys();

    // possibility to jump while moving left/right
    this.player.setVelocityX(0);

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.jump();
    }

    if (cursors.left.isDown) {
      this.player.moveLeft();
    } else if (cursors.right.isDown) {
      this.player.moveRight();
    } else {
      this.player.stop();
    }

    // player shooting bullets to the left/right
    const spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    if (Input.Keyboard.JustDown(spacebar)) {
      const x = this.player.x + ((this.player.direction === 'right') ? 10 : -10);
      this.bullets.fire(x, this.player.y + 5, this.player.direction);
    }
  }
}

export default MainScene;
