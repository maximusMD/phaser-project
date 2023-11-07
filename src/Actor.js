import { Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {
    #hp = 100;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y,);
        this.setTexture(texture);
        this.setFrame(frame);
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true);
    }
    getHP() {
        return this.#hp;
    }
    checkFlip() {
        if (this.body.velocity.x < 0) {
            this.scaleX = -1;
        } else {
            this.scaleX = 1;
        }
    }
    getBody() {
        return this.body;
    }
    setHP(damage) {
        this.#hp -= damage;
    }
}       