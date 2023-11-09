import { Actor } from "./Actor";
import { Enemy } from "./Enemy";

export class RogueDarkLord extends Enemy {
    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel)
        // this.shoot = false;
        this.setScale(0.9)
        this.getBody().setSize(45, 55);
        this.getBody().setOffset(10, 10)
        this.setVision(100)
    }

    checkDistance(player, graphics, line) {
        graphics.clear();
        return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
    }

    update(player, graphics, line) {
        const distance = this.checkDistance(player, graphics, line)

            if (distance < 50) {
                this.facePlayer(player, this)
                this.anims.play('darklord_attack', true)
                if (this.anims.currentFrame.index === 4) {
                this.damageToPlayer(player, 1, 20);
                }
            } 
        else {
            this.anims.play('darklord_idle', true);
        }
    }
}