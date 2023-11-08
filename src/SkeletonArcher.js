import { Enemy } from "./Enemy";

export class SkeletonArcher extends Enemy {

  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
    this.shoot = false;
    this.setScale(0.6)
    this.getBody().setSize(45, 55);
    this.getBody().setOffset(36, (this.height / 2) + 10)
  }

  checkDistance(player, graphics, line) {
    graphics.clear();

    graphics.lineStyle(2, 0xff0000);
    graphics.strokeLineShape(line);
    return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
  }

  damageToPlayer(player, damage, chance = 0) {
    const chanceToHit = Math.random()
    if (chanceToHit < chance / 100) {
      player.updateHP(0)
      console.log("not taken damage: ", player.getHP())
    } else {
      player.updateHP(damage);
      console.log("taken damage: ", player.getHP())
    }
  }


  update(player, graphics, line) {
    const distance = this.checkDistance(player, graphics, line)

    if (distance <= 150) {
      this.shoot = true;

      line.setTo(
        this.getBody().x,
        this.getBody().y,
        player.getBody().x,
        player.getBody().y
      );
    } else {
      graphics.clear();
      this.shoot = false;
    }

    if (this.shoot) {
      if (player.getBody().x < this.getBody().x) {
        this.setFlipX(true);
      } else {
        this.setFlipX(false)
      }
      if (distance < 50) {
        this.anims.play('skeleton_archer_melee_2', true)
        console.log(this.anims.currentFrame.index)
        if (this.anims.currentFrame.index === 4) {
          this.damageToPlayer(player, 1, 20);
        }
      } else {
        this.anims.play('skeleton_archer_attack_1', true)
      }
    } else {
      this.anims.play('skeleton_archer_idle', true);
    }

  }
}