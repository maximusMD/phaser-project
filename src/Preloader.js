import Phaser from "phaser";

export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    this.load.html('userform', './assets/form.html')

    this.load.image('background', 'assets/bg.png')
    this.load.image('title', 'assets/title.png')
  }

  create() {
    this.scene.start('MenuScene');
  }
}