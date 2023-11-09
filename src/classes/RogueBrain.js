import { Actor } from "./Actor";
import { Enemy } from "./Enemy";

export class RogueBrain extends Enemy {
    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel)
        // this.shoot = false;
        this.setScale(0.9)
        this.getBody().setSize(15, 20);
        this.getBody().setOffset(10, 10)
        this.setVision(100)
    }

    checkDistance(player, graphics, line) {
        graphics.clear();
        return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
    }

    update(player, graphics, line) {
        const distance = this.checkDistance(player, graphics, line)

            if (distance < 75) {
                this.facePlayer(player, this)
                this.anims.play('brain_attack', true)
                if (this.anims.currentFrame.index === 4) {
                this.damageToPlayer(player, 1, 20);
                }
            } 
        else {
            this.anims.play('brain_idle', true);
        }
    }
}