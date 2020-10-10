import { GameObjects, Curves } from 'phaser';

class Enemy extends GameObjects.PathFollower {
  constructor(scene, line, x, y, texture) {
    // get each line path from tilemap
    const point1 = { x: line.x, y: line.y };
    const point2 = { x: line.x + line.polyline[1].x, y: line.y + line.polyline[1].y };
    const path = scene.add.path();
    path.add(new Curves.Line(point1, point2));
    super(scene, path, x, y, texture.right);

    // add sprite to scene & attach body to it
    scene.add.existing(this);
    // scene.physics.add.existing(this);

    // animation
    scene.anims.create({
      key: 'anim-run',
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // patrol across line
    this.startFollow({
      repeat: -1,
      duration: 3000,
      yoyo: true,
      flipX: true,
      onStart: () => {
        this.anims.play('anim-run', true);
      },
      onYoyo: () => {
        this.flipX = true;
      },
      onRepeat: () => {
        this.flipX = false;
      },
    });
  }
}

export default Enemy;
