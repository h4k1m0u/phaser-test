import { Scene, Input } from 'phaser';
import Player from '../characters/player';
import Bullets from '../characters/bullets';

// import images
/*
import pathImageStar from '../sprites/star.png';
*/
import pathTileset from '../tilemap/tileset.png';
import pathTilemap from '../tilemap/map.json';

// player images
import pathSpritePlayerStaticLeft from '../sprites/player_static_left.png';
import pathSpritePlayerStaticRight from '../sprites/player_static_right.png';
import pathSpritePlayerLeft from '../sprites/player_left.png';
import pathSpritePlayerRight from '../sprites/player_right.png';
import pathSpritePlayerJumpLeft from '../sprites/player_jump_left.png';
import pathSpritePlayerJumpRight from '../sprites/player_jump_right.png';
import pathBullet from '../sprites/bullet.png';

// background images
import pathClouds from '../sprites/clouds.png';
import pathJungleBackground from '../sprites/jungle-background.png';
import pathJungleForeground from '../sprites/jungle-foreground.png';

// props images
import pathTree1 from '../sprites/tree1.png';
import pathTree2 from '../sprites/tree2.png';
import pathPlant from '../sprites/plant.png';
import pathSkullpanel from '../sprites/skullpanel.png';

class MainScene extends Scene {
  constructor(config) {
    super(config);

    // initialize score
    this.score = 0;
  }

  preload() {
    // tilemap
    this.load.image('tileset', pathTileset);
    this.load.tilemapTiledJSON('tilemap', pathTilemap);

    // background
    this.load.image('clouds', pathClouds);
    this.load.image('jungle-background', pathJungleBackground);
    this.load.image('jungle-foreground', pathJungleForeground);

    // props sprites
    this.load.image('tree1', pathTree1);
    this.load.image('tree2', pathTree2);
    this.load.image('plant', pathPlant);
    this.load.image('skullpanel', pathSkullpanel);

    /*
    // load images & sprites sheet
    this.load.image('star', pathImageStar);
    */

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

  addFromTilemap() {
    // add tilemap layers
    const tilemap = this.make.tilemap({ key: 'tilemap' });
    this.width = tilemap.width * tilemap.tileWidth;
    this.height = tilemap.height * tilemap.tileHeight;

    // parallax background
    this.clouds = this.add.tileSprite(0, 0, this.width, this.height, 'clouds').setOrigin(0, 0);
    this.jungleBackground = this.add.tileSprite(0, 0, this.width, this.height, 'jungle-background').setOrigin(0, 0);
    this.jungleForeground = this.add.tileSprite(0, 0, this.width, this.height, 'jungle-foreground').setOrigin(0, 0);

    // props
    const skullpanel = tilemap.createFromObjects('props', 'skullpanel', { key: 'skullpanel' });
    const plant = tilemap.createFromObjects('props', 'plant', { key: 'plant' });
    const tree1 = tilemap.createFromObjects('props', 'tree1', { key: 'tree1' });
    const tree2 = tilemap.createFromObjects('props', 'tree2', { key: 'tree2' });

    // platform
    const tileset = tilemap.addTilesetImage('tileset', 'tileset');
    this.platform = tilemap.createStaticLayer('platform', tileset, 0, 0);
  }

  create() {
    // tilemap
    this.addFromTilemap();

    // main player
    this.player = new Player(this, 100, 100, {
      static_left: 'player-static-left',
      static_right: 'player-static-right',
      left: 'player-left',
      right: 'player-right',
      jump_left: 'player-jump-left',
      jump_right: 'player-jump-right',
    });

    // collision detection between player & tilemap
    this.platform.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.platform);

    // bullets
    this.bullets = new Bullets(this, 0, 0, 'bullet');
    // this.physics.add.collider(this.bullet, this.platforms);

    // stars
    /*
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
    */

    // score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: 16,
      fontFamily: 'Helvetica',
      fill: '#fff',
    });

    // camera tracks player till scene borders
    this.cameras.main.setBounds(0, 0, this.width, this.height);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    // scroll parallax accord. to camera position
    this.clouds.setTilePosition(this.cameras.main.scrollX * 0.1);
    this.jungleBackground.setTilePosition(this.cameras.main.scrollX * 0.2);
    this.jungleForeground.setTilePosition(this.cameras.main.scrollX * 0.3);

    // keyboard interactions inside game loop
    const cursors = this.input.keyboard.createCursorKeys();

    // possibility to jump while moving left/right
    this.player.setVelocityX(0);

    if (cursors.up.isDown && this.player.body.blocked.down) {
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
