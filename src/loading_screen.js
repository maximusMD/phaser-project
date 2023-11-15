import Phaser from 'phaser'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import credImg from './assets/menu_buttons/credits.png'
import controlsImg from './assets/menu_buttons/controls.png'

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene')
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('main-menu', mainMenuImg)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);


        const mainMenu = this.addButton(gameWidth * 0.9, gameHeight * 0.1, 'main-menu', () => {
            this.handleMain()
        });
        const mainMenuScaleFactor = gameWidth / mainMenu.width; 
        mainMenu.setScale(mainMenuScaleFactor * 0.1835)
    }

    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    handleMain() {
        this.scene.start('BossLevel')
    }
}