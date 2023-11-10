import { Actor } from "./Actor";

export class Enemy extends Actor {

  #walkSpeed = 15;
  #isDead = false;
  #vision = 100;
  #meleeDamage = 10;
  #rangeDamage = 20;
  #isWandering = true;

  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
    this.setIsDead(false);
  }

  // getters
  getWalkSpeed() {
    return this.#walkSpeed;
  }

  getIsDead() {
    return this.#isDead;
  }

  getVision() {
    return this.#vision;
  }

  getMeleeDamage() {
    return this.#meleeDamage;
  }

  getRangeDamage() {
    return this.#rangeDamage;
  }

  getIsWandering() {
    return this.#isWandering;
  }

  // setters
  updateHP(damage) {
    this.setHP(damage);
    if (this.getHP() <= 0) {
      this.setIsDead();
    }
  }
  setWalkSpeed(speed) {
    this.#walkSpeed = speed;
  }

  setIsDead() {
    this.#isDead = !this.#isDead;
  }

  setVision(visionRange) {
    this.#vision = visionRange;
  }

  setMeleeDamage(melee) {
    this.#meleeDamage = melee;
  }

  setRangeDamage(range) {
    this.#meleeDamage = range;
  }

  setIsWandering(bool) {
    this.#isWandering = bool;
  }

  // functions
  facePlayer(player, enemy) {
    if (player.getBody().x < enemy.x) {
      enemy.setFlipX(true);
    } else {
      enemy.setFlipX(false);
    }
  }

  handleCompleteAnims(e) {
    // console.log('completed', e)

  }

  handleStoppedAnims(e) {
    // console.log('stopped: ', e)
  }

  // moveAndIdle(direction, numTiles, walkKey, idleKey) {
  //   this.play(walkKey, true);

  //   const tileSize = 16;
  //   const distance = tileSize * numTiles;
  //   const tweenConfig = {
  //     targets: this,
  //     x: this.x + (direction === 'left' ? -distance : distance),
  //     ease: 'Linear',
  //     duration: 1000,
      
  //     onComplete: () => {
  //       this.play(idleKey, true);
  //     },
      
  //   }
  //   this.scene.tweens.add(tweenConfig)
  // }

  // wander() {
  //   this.setVelocityX(this.getWalkSpeed())
  //   this.anims.play('skeleton_archer_walk', true)
  //   if (this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
  //     console.log(this.anims)
  //     this.setVelocityX(0);
  //     this.anims.play('skeleton_archer_idle', true)
  //     // if (this.anims.currentFrame.index === this.anims.currentAnims.frames.length) {
  //     //   this.setFlipX(false)
  //     //   this.setVelocityX(-this.getWalkSpeed())
  //     //   this.anims.chain('skeleton_archer_walk')
  //     // }
  //   }
  // }

  // stopWandering() {
  //   this.setIsWandering(false);
  //   this.setVelocityX(0);
  // }

  checkDistance(player, graphics, line) {

    return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
  }

  damageToPlayer(player, damage, chance = 0) {
    const chanceToHit = Math.random(0, 1);
    if (chanceToHit < chance / 100) {
      player.setHP(0)
      console.log("no damage taken: ", player.getHP())
    } else {
      player.setHP(damage);
      console.log("taken damage: ", player.getHP())
    }
  }

  // takes in the animation
  // takes in percantage chance for attack to land
  handleMelee(attack, chance) {
    this.anims.play(attack, true)
    if (this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
      this.damageToPlayer(this.scene.player, this.getMeleeDamage(), chance);
      this.anims.chain('skeleton_archer_idle')
      this.anims.stop()
    }
  }

  handleRanged(attack, chance) {
    this.anims.play(attack, true)

    if (this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
      this.damageToPlayer(this.scene.player, this.getRangeDamage(), chance);
      this.anims.stop();
    }
  }

  checkOverlap(player) {
    return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), this.getBounds());
  }
}