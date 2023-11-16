import Phaser from 'phaser'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import credImg from './assets/menu_buttons/credits.png'
import shareImg from './assets/menu_buttons/share.png';

export class AboutScene extends Phaser.Scene {
    constructor() {
        super('AboutScene')
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('credits', credImg)
        this.load.image('main-menu', mainMenuImg)
        this.load.image('share', shareImg);
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

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

        const share = this.addButton(gameWidth * 0.915, gameHeight * 0.9, 'share', () => {
            const currentURL = window.location.href;
            this.copyToClipboard(currentURL);
            alert('URL copied to clipboard: ' + currentURL)
        });
        const shareScaleFactor = gameWidth / share.width;
        share.setScale(shareScaleFactor * 0.16);

        WebFont.load({
            google: {
                families: ['Pixelify Sans'],
            },
            active: () => {
                this.info = this.add.text(gameWidth * 0.05, gameHeight * 0.05, 
                    `       Dark Descent was built by Max, Rak, Ryan, Marius, and Yasar 
                    as a final project for the Northcoders Software Engineering Bootcamp.

                    Built in just 8 days, we managed to incorporate:

                    - Fully self-designed level with 4 different enemy types
                    
                    - Boss level with unique movement patterns

                    - Dynamic Leaderboard       - Sign-In Functionality

                    - Options Functionality     - Pause Functionality

                    This game has been built using Phaser v3.6, MongoDB, Bcrypt, and Node.JS; 
                    making use of assets created by Max and S4m-ur4i.

                    Thanks for playing! Check us out on Github and LinkedIn via the Credits page!`, 
                    {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '22px',
                    fill: '#FFFFFF',
                    align: 'center',
                })
                this.info.setOrigin(-0.22, -0.35);
            }
        })
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

    handleMain() {
        this.scene.start('MenuScene')
    }

    copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}