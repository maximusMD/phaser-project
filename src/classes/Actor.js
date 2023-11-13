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
    updateHealthBar(healthBar) {
        const frameIndex = Math.floor((4 * (100 - this.#hp)) / 100); // Calculate frame index based on health
        healthBar.setFrame(`Heart-${frameIndex}.png`);
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
    setHP(damage, ignoreInvul = false) {
        if (this.getGodMode?.()) return;

        if (!this.getIsInvul?.() || ignoreInvul) {
            this.#hp -= damage;
        } else {
            console.log("invul to dmg")
        }
    }

}       