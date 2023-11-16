import { Actor } from "./Actor";
import { Enemy } from "./Enemy"

export class Sneaker extends Enemy {

    constructor(scene, x, y, enemyModel) {
        super(scene, x, y, enemyModel);

        this.setScale(1.4)
        this.getBody().setSize(20, 30);
        this.getBody().setOffset(3, 1)
        this.setVision(50)
        this.setMeleeDamage(2);
        this.setWalkSpeed(10)
        this.setScore(15);
        this.setHP(80);
        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);
    }

    handleCompleteAnims(e) {
        if (e.key === 'sneaker_walk' && this.getIsWandering() === false || this.isNearEdge()) {
            this.anims.play('sneaker_walk', true);
            this.setFlipX(!this.flipX)
            this.setWalkSpeed(-1 * this.getWalkSpeed());

            this.scene.time.delayedCall(2000, () => {
                this.startPos = undefined;
                this.setIsWandering(true);
                this.setAggro(false);
            });
        }

        if (e.key === 'sneaker_attack') {
            this.anims.stop()
            this.anims.play('sneaker_walk', true);

            this.scene.time.delayedCall(2000, () => {
                this.setAggro(false);
                this.setFinishAttack(false);
            })
        }


        if (e.key === 'sneaker_die') {
            this.destroy();
        }
    }

    handleStoppedAnims(e) {
        if (e.key === 'sneaker_attack') {
            this.setFinishAttack(true);
        }
        
    }
    update(player){
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
                this.handleMelee('sneaker_attack')
            } else {
                this.setIsWandering(true);
            }
        } else {
            if (this.getIsWandering()) {
                this.wander(1, 'sneaker_walk', 'sneaker_walk');
            }
        }
    }

    
}
