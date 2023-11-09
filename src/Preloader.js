import Phaser from "phaser";

export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    // Load all assets needed for game in this preload
    this.load.html('userform', './assets/form.html')

    this.load.image('background', 'assets/bg.png')
    this.load.image('title', 'assets/title.png')
  }

  create() {
    // call the first scene
    this.scene.start('MenuScene');
  }

  updateProgress(percentage) {
    // update width of loading bar based on percentage
  }
}