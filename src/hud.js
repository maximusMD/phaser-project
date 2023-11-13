import Phaser from 'phaser'

import heart_image from './assets/animations/sprites/Heart GUI/heart_atlas.png'
import heart_atlas from './assets/animations/sprites/Heart GUI/heart_atlas.json'
import { Actor } from './classes/Actor'

export class HUDScene extends Phaser.Scene {

    constructor () {
        super({ key: 'HUDScene'});
        this.score = 0;
    }

    preload () {
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )

        this.load.atlas('health', heart_image, heart_atlas)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        WebFont.load({
            google: {
                families: ['Pixelify Sans'],
            },
            active: () => {
                let info = this.add.text(gameWidth * 0.05, gameHeight * 0.05, 'Score: 0', {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '48px',
                    fill: '#FFFFFF',
                })
                let ourGame = this.scene.get('RyanLevel')
                ourGame.events.on('addScore', function () {
                    this.score += 10;
                    info.setText('Score: ' + this.score)
                }, this)
            }
        })

        const healthBar = this.add.sprite(gameWidth * 0.1123, gameHeight * 0.15, 'health', 'Heart-0.png');
        const healthBarScaleFactor = gameWidth / healthBar.width
        healthBar.setScale(healthBarScaleFactor * 0.135)
    
        this.anims.create({
            key: 'healthAnimation',
            frames: this.anims.generateFrameNames('health', {
                prefix: 'Heart-',
                start: 0,
                end: 4,
                zeroPad: 1,
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 3
        });
    
        healthBar.play('healthAnimation');

        if (this.player) {
            this.player.setHealthBar(healthBar);
        }
    }

    // updateHealthBar() {
    //     const healthPercentage = // Calculate health percentage;
    //     const frameIndex = Math.floor(healthPercentage * 4);

    //     Set the frame based on the health percentage
    //     healthBar.setFrame(`Heart-${frameIndex}.png`);
    // }
}