import { Actor } from "./Actor";
import { Enemy } from "./Enemy";
import { ArrowGroup } from "./ProjectileGroup";

export class SkeletonArcher extends Enemy {
  #arrows;

  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
    this.scene = scene;
    this.shoot = false;
    this.setScale(0.5)
    this.getBody().setSize(45, 55);
    this.getBody().setOffset(36, (this.height / 2) + 10)
    this.setVision(100);
    this.setMeleeDamage(1);
    this.setRangeDamage(5);
    this.#arrows = new ArrowGroup(this.scene);
  }
  arrowHit(player, arrow) {
    if (!arrow.getHasHit()) {
      player.setHP(arrow.getArrowDamage());
      console.log(player.getHP());
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
    if (e.key === 'skeleton_archer_walk' && this.getIsWandering() === false) {
      this.anims.play('skeleton_archer_idle', true);
      this.setFlipX(!this.flipX)
      this.setWalkSpeed(-1 * this.getWalkSpeed());

      this.scene.time.delayedCall(2000, () => {
        this.startPos = undefined;
        this.setIsWandering(true);
        this.shoot = false;
      });
    }
  }

  handleStoppedAnims(e) {
    // console.log(e.key)
  }

  update(player, graphics, line) {
    this.on('animationcomplete', this.handleCompleteAnims);
    this.on('animationstop', this.handleStoppedAnims);

    const distance = this.checkDistance(player, graphics, line)

    if (distance <= this.getVision()) {
      this.shoot = true;
      this.stopWandering();
    } else {
      this.shoot = false;
      this.setIsWandering(true);
    }

    if (this.shoot) {
      this.facePlayer(player, this)
      if (this.checkOverlap(player)) {
        this.handleMelee('skeleton_archer_melee_2', 20);
      } else {
        this.handleRanged('skeleton_archer_attack_1', 15)
      }
    } else {
      if (this.getIsWandering()) {
        this.wander(3, 'skeleton_archer_walk', 'skeleton_archer_idle');
      }
    }
  }
}