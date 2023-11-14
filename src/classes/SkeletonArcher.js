import { Actor } from "./Actor";
import { Enemy } from "./Enemy";
import { ArrowGroup } from "./ProjectileGroup";

export class SkeletonArcher extends Enemy {
  #arrows;

  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
    this.scene = scene;
    this.setScale(0.5)
    this.getBody().setSize(45, 55);
    this.getBody().setOffset(36, (this.height / 2) + 10)
    this.setVision(100);
    this.setMeleeDamage(1);
    this.setRangeDamage(5);
    this.#arrows = new ArrowGroup(this.scene);
    this.setScore(20);

    this.on('animationcomplete', this.handleCompleteAnims);
    this.on('animationstop', this.handleStoppedAnims);
  }
  arrowHit(player, arrow) {
    if (!arrow.getHasHit()) {
      player.setHP(arrow.getArrowDamage());
    }
    arrow.setHasHit(true);
    arrow.setVisible(false);

    // Reset needs a better more perm solution later
    arrow.body.reset(-400, -400);
  }
  getArrows() {
    return this.#arrows;
  }

  shootArrow() {
    const direction = this.flipX ? -1 : 1;
    this.getArrows().fireArrow(this.getBody().x, this.getBody().y, direction, this.getRangeDamage())
  }
  
  handleCompleteAnims(e) {
    if (e.key === 'skeleton_archer_walk' && this.getIsWandering() === false || this.isNearEdge()) {
      this.anims.play('skeleton_archer_idle', true);
      this.setFlipX(!this.flipX)
      this.setWalkSpeed(-1 * this.getWalkSpeed());
      
      this.scene.time.delayedCall(2000, () => {
        this.startPos = undefined;
        this.setIsWandering(true);
        this.setAggro(false);
      });
    }

    if (e.key === 'skeleton_archer_melee_2') {
      this.anims.stop()
      this.anims.play('skeleton_archer_idle', true);

      this.scene.time.delayedCall(2000, () => {
        this.setAggro(false);
      })
      
    }
    
    if (e.key === 'skeleton_archer_die') {
      this.destroy();
    }
  }

  handleStoppedAnims(e) {
    if (e.key === 'skeleton_archer_attack_1') {
      this.setFinishAttack(true);
    }

    if (e.key === 'skeleton_archer_melee_2') {
      this.setFinishAttack(true);
    }
  }

  update(player) {



    if(this.getIsDead()) {
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
        this.handleMelee('skeleton_archer_melee_2');
      } else {
        this.stopWandering()
        this.handleRanged('skeleton_archer_attack_1')
      }
    } else {
      if (this.getIsWandering()) {
        this.wander(3, 'skeleton_archer_walk', 'skeleton_archer_idle');
      }
    }
  }
}