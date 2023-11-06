import Phaser from 'phaser'

export class MenuScene extends Phaser.Scene {
    constructor () {
        super({ key: 'MenuScene' })
    }

    preload () {
        this.load.image('background', 'assets/bg.png')
    }

    create () {
        const background = this.add.image(0, 0, 'background');

        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
    
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2)
    }
}