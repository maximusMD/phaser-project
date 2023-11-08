import Phaser from 'phaser'
import optImg from './assets/options.png'
import logoutImg from './assets/logout.png'
import sfxImg from './assets/sfx.png'
import musicImg from './assets/music.png'
import weatherImg from './assets/weather.png'
import zoomImg from './assets/zoom.png'
import controlsImg from './assets/controls.png'
import mainMenuImg from './assets/main-menu.png'
import shareImg from './assets/share.png'
import credImg from './assets/credits.png'

export class OptionsScene extends Phaser.Scene {
    constructor () {
        super({ key: 'OptionsScene' })
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('header', optImg)
        this.load.image('weather', weatherImg)
        this.load.image('music', musicImg)
        this.load.image('sfx', sfxImg)
        this.load.image('zoom', zoomImg)
        this.load.image('controls', controlsImg)
        this.load.image('logout', logoutImg)
        this.load.image('credits', credImg)
        this.load.image('share', shareImg)
        this.load.image('main-menu', mainMenuImg)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const header = this.add.image(gameWidth * 0.52, gameHeight * 0.25, 'header');
        const headerScaleFactor = gameWidth / header.width
        header.setScale(headerScaleFactor * 0.55);

        const weather = this.add.image(gameWidth * 0.325, gameHeight * 0.4, 'weather')
        const weatherScaleFactor = gameWidth / weather.width; 
        weather.setScale(weatherScaleFactor * 0.1635)

        const music = this.add.image(gameWidth * 0.325, gameHeight * 0.48, 'music')
        const musicScaleFactor = gameWidth / music.width; 
        music.setScale(musicScaleFactor * 0.12)

        const sfx = this.add.image(gameWidth * 0.325, gameHeight * 0.57, 'sfx')
        const sfxScaleFactor = gameWidth / sfx.width; 
        sfx.setScale(sfxScaleFactor * 0.08)

        const zoom = this.add.image(gameWidth * 0.325, gameHeight * 0.65, 'zoom')
        const zoomScaleFactor = gameWidth / zoom.width; 
        zoom.setScale(zoomScaleFactor * 0.11)

        const controls = this.addButton(gameWidth * 0.517, gameHeight * 0.75, 'controls', () => {
            this.handleControls()
        })
        const controlsScaleFactor = gameWidth / controls.width; 
        controls.setScale(controlsScaleFactor * 0.21)

        const logout = this.addButton(gameWidth * 0.517, gameHeight * 0.865, 'logout', () => {
            console.log('Logout')
        })
        const logoutScaleFactor = gameWidth / logout.width; 
        logout.setScale(logoutScaleFactor * 0.19)

        const credits = this.addButton(gameWidth * 0.1, gameHeight * 0.9, 'credits', () => {
            this.openCred()
        });
        const creditsScaleFactor = gameWidth / credits.width; 
        credits.setScale(creditsScaleFactor * 0.1835)
    
        const share = this.addButton(gameWidth * 0.915, gameHeight * 0.9, 'share', () => {
            console.log('Share');
        });
        const shareScaleFactor = gameWidth / share.width; 
        share.setScale(shareScaleFactor * 0.16)
    
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

    openCred() {
        const credLink = 'https://www.youtube.com/watch?v=YXIHXQjbtl8'
        window.open(credLink, '_blank')
    }

    handleControls() {
        this.scene.start('ControlsScene')
    }

    handleMain() {
        this.scene.start('MenuScene')
    }

    // handleControls() {
    //     this.scene.start('ControlsScene')
    // }
}