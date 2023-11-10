import { Actor } from "./Actor";
import { Enemy } from "./Enemy";

export class SkeletonArcher extends Enemy {

  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
    this.shoot = false;
    this.setScale(0.6)
    this.getBody().setSize(45, 55);
    this.getBody().setOffset(36, (this.height / 2) + 10)
    this.setVision(100);
    this.setMeleeDamage(1);
    this.setRangeDamage(5);
  }

  update(player, graphics, line) {
    // this.on('animationcomplete', this.handleCompleteAnims);
    // this.on('animationstop', this.handleStoppedAnims);

    const distance = this.checkDistance(player, graphics, line)

    if (distance <= this.getVision()) {
      this.shoot = true;
    } else {
      this.shoot = false;
    }

    if (this.shoot) {
      this.stopWandering();
      this.facePlayer(player, this)
      if (this.checkOverlap(player)) {
        this.handleMelee('skeleton_archer_melee_2',20);
      } else {
        this.handleRanged('skeleton_archer_attack_1',15)

      }
    } else {
      // this.anims.play('skeleton_archer_idle', true)
      this.wander();
      // this.anims.play('skeleton_archer_idle', true);
      // if(this.body.onFloor()) {
      //   // check x position and plus and minus to get wander effect
      //   this.wander();
      // } else {
      //   this.stopWandering();
      // }
    }

  }
}