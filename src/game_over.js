import Phaser from 'phaser'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import credImg from './assets/menu_buttons/credits.png'
import controlsImg from './assets/menu_buttons/controls.png'

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('AboutScene')
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('credits', credImg)
        this.load.image('controls', controlsImg)
        this.load.image('main-menu', mainMenuImg)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const controls = this.addButton(gameWidth * 0.517, gameHeight * 0.75, 'controls', () => {
            this.handleControls()
        })
        const controlsScaleFactor = gameWidth / controls.width; 
        controls.setScale(controlsScaleFactor * 0.21)

        const credits = this.addButton(gameWidth * 0.1, gameHeight * 0.9, 'credits', () => {
            this.handleCredits()
        });
        const creditsScaleFactor = gameWidth / credits.width; 
        credits.setScale(creditsScaleFactor * 0.1835)

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

    handleCredits() {
        this.scene.start('CreditsScene')
    }

    handleControls() {
        this.scene.start('ControlsScene')
    }

    handleMain() {
        this.scene.start('MenuScene')
    }
}