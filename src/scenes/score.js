import { Scene } from 'phaser';

class ScoreScene extends Scene {
  constructor() {
    // active scenes are drawn with first scene registered
    super({ key: 'scene-score', active: true });
  }

  create() {
    // score text
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: 16,
      fontFamily: 'Helvetica',
      fill: '#fff',
    }).setOrigin(0, 0);

    // capture score incremented event emitted from main scene
    const mainScene = this.scene.get('scene-main');
    mainScene.events.on('onScoreIncremented', (score) => {
      this.scoreText.setText(`Score: ${score}`);
    });
  }
}

export default ScoreScene;
