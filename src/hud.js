import Phaser from 'phaser'

export class HUDScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'HUDScene'});

        this.score = 0;
    }

    create ()
    {

        let info = this.add.text(10, 10, 'Score: 0', { font: '48px Arial', fill: '#FFFFFF' });

        let ourGame = this.scene.get('RyanLevel');

        ourGame.events.on('addScore', function () {

            this.score += 10;

            info.setText('Score: ' + this.score);

        }, this);
    }
}