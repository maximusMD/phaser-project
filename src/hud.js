import Phaser from 'phaser'

export class HUDScene extends Phaser.Scene {

    constructor () {
        super({ key: 'HUDScene'})
        this.score = 0
    }

    preload () {
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )
    }

    create() {
        WebFont.load({
            google: {
                families: ['Pixelify Sans'],
            },
            active: () => {
                let info = this.add.text(10, 10, 'Score: 0', {
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
    }
}