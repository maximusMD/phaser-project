import Phaser from 'phaser'
import optImg from './assets/options.png'
import logoutImg from './assets/logout.png'
import sfxImg from './assets/sfx.png'
import musicImg from './assets/music.png'
import weatherImg from './assets/weather.png'
import zoomImg from './assets/zoom.png'
import controlsImg from './assets/controls.png'

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
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const header = this.add.image(420, 175, 'header');
        header.setScale(1.8);

        const weather = this.add.image(270, 260, 'weather')
        weather.setScale(0.6)
        const music = this.add.image(270, 300, 'music')
        music.setScale(0.6)
        const sfx = this.add.image(270, 340, 'sfx')
        sfx.setScale(0.6)
        const zoom = this.add.image(270, 380, 'zoom')
        zoom.setScale(0.6)
        const controls = this.addButton(415, 460, 'controls', () => {
            console.log('Controls')
        })
        controls.setScale(0.6)
        const logout = this.addButton(415, 520, 'logout', () => {
            console.log('Logout')
        })
        logout.setScale(0.75)
    }

    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    // handleControls() {
    //     this.scene.start('ControlsScene')
    // }
}