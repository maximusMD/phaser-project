import { Actor } from "./Actor";

export class Sneaker extends Actor {

    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel);

        this.setScale(0.6)
        this.getBody().setSize(45, 55);
        this.getBody().setOffset(36, (this.height / 2) + 10)
        this.createAnimations();
    }

    createAnimations() {
        // this.scene.anims.create({
        //     key: 'skeleton_archer_idle',
        //     frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        //         prefix: 'skeleton_archer_idle-',
        //         suffix: '.png',
        //         start: 1,
        //         end: 7
        //     }),
        //     frameRate: 10,
        //     repeat: -1
        // })
    }
}