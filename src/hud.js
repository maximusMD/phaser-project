import Phaser from 'phaser'

import heart_image from './assets/animations/sprites/Heart GUI/heart_atlas.png'
import heart_atlas from './assets/animations/sprites/Heart GUI/heart_atlas.json'
import { Actor } from './classes/Actor'

export class HUDScene extends Phaser.Scene {

    constructor() {
        super({ key: 'HUDScene' });
        this.score = 0;
        this.info;
        this.healthPercentageText;
    }

    preload() {
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
                this.info = this.add.text(gameWidth * 0.05, gameHeight * 0.05, `Score: ${this.score}`, {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '48px',
                    fill: '#FFFFFF',
                }),
                this.healthPercentageText = this.add.text(gameWidth *0.19, gameHeight * 0.14, '100%', {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '18px',
                    fill: '#FFFFFF'
                });

                // let ourGame = this.scene.get('RyanLevel')
                // ourGame.events.on('addScore', function () {
                //     this.score += 10;
                //     info.setText('Score: ' + this.score)
                // }, this)
            }
        })

        this.healthBar = this.add.sprite(gameWidth * 0.1123, gameHeight * 0.15, 'health', 'Heart-0.png');
        const healthBarScaleFactor = gameWidth / this.healthBar.width
        this.healthBar.setScale(healthBarScaleFactor * 0.135)


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
    }

    addScore(score) {
        this.score += score;
        if (this.info) {
            this.info.setText('Score: ' + this.score)
        }
    }

    updateHealthBar(player) {
        let frameIndex = 0;
        const healthPercentage = player.getHP() / player.startingHP;

        if(healthPercentage === 1) {
            frameIndex = 0;
        } else if (healthPercentage <= 0 ) {
            frameIndex = 4
        } else if (healthPercentage <= 0.25) {
            frameIndex = 3;
        } else if (healthPercentage <= 0.5) {
            frameIndex = 2;
        } else if (healthPercentage <= 0.75) {
            frameIndex = 1;
        }
        // const frameIndex = Math.floor(healthPercentage * 4);

        // const frameIndex = Math.floor((4 * (100 - this.#hp)) / 100); // Calculate frame index based on health

        // Set the frame based on the health percentage
        if (this.healthBar) {
            this.healthBar.setFrame(`Heart-${frameIndex}.png`);
        }

        if (this.healthPercentageText) {
            this.healthPercentageText.setText(`${Math.round(healthPercentage * 100)}%`)
        }

    }

    update() {

    }
}