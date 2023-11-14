import { Actor } from "./Actor";
import { Enemy } from "./Enemy";

export class RogueDarkLord extends Enemy {
    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel)
        this.setScale(0.9)
        this.getBody().setSize(30, 45);
        this.getBody().setOffset(15, 20)
        this.setVision(50)
        this.setMeleeDamage(5);
        this.setWalkSpeed(10)
        this.setRangeDamage(0);
        this.setScore(20);

        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);



    }

    handleCompleteAnims(e) {
        if (e.key === 'darklord_walk' && this.getIsWandering() === false || this.isNearEdge()) {
            this.anims.play('darklord_idle', true);
            this.setFlipX(!this.flipX)
            this.setWalkSpeed(-1 * this.getWalkSpeed());

            this.scene.time.delayedCall(2000, () => {
                this.startPos = undefined;
                this.setIsWandering(true);
                this.setAggro(false);
            });
        }

        if (e.key === 'darklord_attack') {
            this.anims.stop()
            this.anims.play('darklord_idle', true);

            this.scene.time.delayedCall(2000, () => {
                this.setAggro(false);
                this.setFinishAttack(false);
            })
        }

        if (e.key === 'darklord_die') {
            this.destroy();
        }

    }

    handleStoppedAnims(e) {

        if (e.key === 'darklord_attack') {
            this.setFinishAttack(true);
        }

    }

    update(player) {

        if (this.getIsDead()) {
            return;
        }

        const distance = this.checkDistance(player)

        if (distance <= this.getVision()) {
            this.setAggro(true);
            this.stopWandering();
        } else {
            this.setAggro(false);
            this.setIsWandering(true);
        }

        if (this.getAggro() || this.getFinishAttack()) {
            this.facePlayer(player, this)
            if (this.checkOverlap(player)) {
                this.handleMelee('darklord_attack')
            } else {
                this.setIsWandering(true);
            }
        } else {
            if (this.getIsWandering()) {
                this.wander(1, 'darklord_walk', 'darklord_idle');
            }
        }
    }
}