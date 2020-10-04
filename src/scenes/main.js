import { Scene } from 'phaser';
import Player from '../characters/player';

// import images
import pathImageSky from '../images/sky.png';
import pathImageStar from '../images/star.png';
import pathImagePlatform from '../images/platform.png';

import pathSpritePlayerStatic from '../images/player_static.png';
import pathSpritePlayerLeft from '../images/player_left.png';
import pathSpritePlayerRight from '../images/player_right.png';
import pathSpritePlayerJump from '../images/player_jump.png';

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
    this.load.image('player-static', pathSpritePlayerStatic);
    this.load.spritesheet('player-left', pathSpritePlayerLeft, { spacing: 2, frameWidth: 22, frameHeight: 22 });
    this.load.spritesheet('player-right', pathSpritePlayerRight, { spacing: 2, frameWidth: 22, frameHeight: 22 });
    this.load.spritesheet('player-jump', pathSpritePlayerJump, { spacing: 2, frameWidth: 22, frameHeight: 22 });
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
      static: 'player-static',
      left: 'player-left',
      right: 'player-right',
      jump: 'player-jump',
    });

    // collision detection for player
    this.physics.add.collider(this.player, this.platforms);

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
  }
}

export default MainScene;
