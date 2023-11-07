import Phaser from 'phaser'
import guestImg from './assets/guest.png'
import lbImg from './assets/leaderboard.png'
import signInImg from './assets/sign-in.png'
import shareImg from './assets/share.png'
import credImg from './assets/credits.png'
import optImg from './assets/options.png'
// import menuMusic from './assets/menuMusic.wav'

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' })
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('title', 'assets/title.png')
        this.load.image('sign-in', signInImg)
        this.load.image('guest', guestImg)
        this.load.image('leaderboard', lbImg)
        this.load.image('credits', credImg)
        this.load.image('share', shareImg)
        this.load.image('options', optImg)

        // this.load.audio('menuMusic', menuMusic)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const title = this.add.image(420, 175, 'title');
        title.setScale(1.8);

        const signIn = this.addButton(420, 310, 'sign-in', () => {
            console.log('Sign-in');
        });

        const guest = this.addButton(420, 380, 'guest', () => {
            console.log('Guest');
        });

        const lb = this.addButton(416, 520, 'leaderboard', () => {
            console.log('Leaderboard');
        });
        lb.setScale(0.75);

        const credits = this.addButton(70, 590, 'credits', () => {
            this.openCred()
        });
        credits.setScale(0.6);

        const share = this.addButton(750, 590, 'share', () => {
            console.log('Share');
        });
        share.setScale(0.6);

        const options = this.addButton(735, 20, 'options', () => {
            this.handleOptions()
        });
        options.setScale(0.6)

        const createButton = this.add.image(150, 50, 'createButton').setScale(2.5)
        const buttonText = this.add.text(100, 32, "Sign up", {
            font: "24px Arial",
            fill: "white"
        })
        createButton.setInteractive();
        guestButton.setInteractive();

        createButton.on('pointerover', () => {
            createButton.setTint(0xcccccc);
        });
        createButton.on('pointerout', () => {
            createButton.clearTint();
        });
        createButton.on('pointerdown', () => {
            console.log('Create User button clicked');
            this.scene.start('UserForm');
        });
        guestButton.on('pointerdown', () => {
            this.scene.start('RyanLevel')
        })
    }
    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    openCred() {
        const credLink = 'https://www.youtube.com/watch?v=YXIHXQjbtl8'
        window.open(credLink, '_blank')
    }

    handleOptions() {
        this.scene.start('OptionsScene')
    }
}