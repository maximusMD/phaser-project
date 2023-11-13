import { Actor } from "./Actor";
import { Enemy } from "./Enemy";

export class RogueBrain extends Enemy {
    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel)
        this.setScale(0.9)
        this.getBody().setSize(15, 20);
        this.getBody().setOffset(10, 10)
        this.setVision(75)
        this.setMeleeDamage(2);
        this.setRangeDamage(0);
        this.setScore(10);
        this.setHP(80);
        this.setFlipX(!this.flipX)
        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);
    }

    handleCompleteAnims(e) {
        if (e.key === 'brain_die') {
            this.destroy();
        }
    }

    handleStoppedAnims(e) {

    }

    update(player) {

        if(this.getIsDead()) {
            return;
        }
        
        const distance = this.checkDistance(player)

        if (distance <= this.getVision()) {
            this.setAggro(true);
        } else {
            this.setAggro(false);
        }

            if (this.getAggro() || this.getFinishAttack()) {
                this.facePlayer(player, this)
                if(this.checkOverlap(player)) {
                    this.handleMelee('brain_attack');
                } 
                // this.anims.play('brain_attack', true)
                // if (this.anims.currentFrame.index === 4) {
                // this.damageToPlayer(player, 1, 20);
            } else {
            this.anims.play('brain_idle', true);
        }
    }
}