import { Actor } from "./Actor";

export class Sneaker extends Actor {

    constructor(scene, x, y, enemyModel, collisions) {
        super(scene, x, y, enemyModel);

        this.setScale(1.5);
        this.getBody().setSize(20, 10);
        this.getBody().setOffset(5, 22);
        // scene.physics.add.collider(this, scene.ground);
    }
    // sneaker defaults other direction and needs an opposite flip check to Actor class
    checkFlip() {
        if (this.body.velocity.x < 0) {
            this.scaleX = 1;
        } else {
            this.scaleX = -1;
            this.getBody().setOffset(25,22)
        }
    }

    

    update() {
        this.getBody().setVelocityX(10)
        this.checkFlip();
        if (!this.anims.isPlaying) {
            this.anims.play("sneaker_attack")
        }
    }

}