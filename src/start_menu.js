import Phaser from 'phaser'
import guestImg from './assets/guest.png'
import lbImg from './assets/leaderboard.png'
import signInImg from './assets/sign-in.png'

export class MenuScene extends Phaser.Scene {
    constructor () {
        super({ key: 'MenuScene' })
    }

    preload () {
        this.load.image('background', 'assets/bg.png')
        this.load.image('title', 'assets/title.png')
        this.load.image('sign-in', signInImg)
        this.load.image('guest', guestImg)
        this.load.image('leaderboard', lbImg)
    }

    create () {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        
        const background = this.add.image(0, 0, 'background');    
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2)

        const title = this.add.image(0, 0, 'title')
        const signIn = this.add.image(420, 310, 'sign-in')
        const guest = this.add.image(420, 380, 'guest')
        const lb = this.add.image(420, 525, 'leaderboard')
    }
}