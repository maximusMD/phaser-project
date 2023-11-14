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

        this.floatToggle = false;
        this.startY = this.getBody().y;

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

    floating() {
        this.startY = this.startY ?? this.getBody().y;

        if (this.floatToggle) {
            this.getBody().setVelocityY(-5);
            if (this.getBody().y <= this.startY - 1) {
                this.startY = undefined;
                this.floatToggle = !this.floatToggle;
            }
        } else {
            this.getBody().setVelocityY(5);
            if (this.getBody().y >= this.startY + 1) {
                this.startY = undefined;
                this.floatToggle = !this.floatToggle
            }
        }
    }

    update(player) {

        if (this.getIsDead()) {
            return;
        }

        this.floating()

        const distance = this.checkDistance(player)

        if (distance <= this.getVision()) {
            this.setAggro(true);
        } else {
            this.setAggro(false);
        }

        if (this.getAggro() || this.getFinishAttack()) {
            this.facePlayer(player, this)
            if (this.checkOverlap(player)) {
                this.handleMelee('brain_attack');
            }
        } else {
            this.anims.play('brain_idle', true);
        }
    }
}

