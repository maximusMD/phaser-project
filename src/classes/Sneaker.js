import { Actor } from "./Actor";
import { Enemy } from "./Enemy"

export class Sneaker extends Enemy {

    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel);

        this.setScale(0.6)
        this.getBody().setSize(45, 55);
        this.getBody().setOffset(36, (this.height / 2) + 10)
        this.setVision(75)
        this.setMeleeDamage(2);
        this.setRangeDamage(5);
        this.setScore(15);
        this.setHP(80);
        this.setFlipX(!this.flipX)

        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);
    }

    handleCompleteAnims(e) {
        if (e.key === 'sneaker_die') {
            this.destroy();
        }
    }

    handleStoppedAnims(e) {

    }

    // createAnimations() {
    //     this.scene.anims.create({
    //         key: 'skeleton_archer_idle',
    //         frames: this.scene.anims.generateFrameNames('skeleton_archer', {
    //             prefix: 'skeleton_archer_idle-',
    //             suffix: '.png',
    //             start: 1,
    //             end: 7
    //         }),
    //         frameRate: 10,
    //         repeat: -1
    //     })
    // }
}