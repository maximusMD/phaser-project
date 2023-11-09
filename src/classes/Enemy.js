import { Actor } from "./Actor";

export class Enemy extends Actor {

  #walkSpeed = 15;
  #isDead = false;
  #vision = 100;
  #meleeDamage = 10;
  #rangeDamage = 20;

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

  // functions
  facePlayer(player, enemy) {
    // console.log(player)
    if (player.getBody().x < enemy.x) {
      enemy.setFlipX(true);
    } else {
      enemy.setFlipX(false);
    }
  }

  wander() {
    // const direction = Phaser.Math.Between(0, 1);

    let direction = 1;
    if (direction === 0) {
      this.setVelocityX(-this.getWalkSpeed());
      this.setFlipX(true);
      this.anims.play('skeleton_archer_walk', true)
      this.anims.chain(['skeleton_archer_idle'])
      direction = 1;
    } else {
      this.setVelocityX(this.getWalkSpeed())
      this.setFlipX(false);
      this.anims.play('skeleton_archer_walk', true)
      this.anims.chain(['skeleton_archer_idle'])
      direction = 0;
    }

  }

  stopWandering() {
    this.setVelocityX(0);
  }

  checkDistance(player, graphics, line) {
    graphics.clear();

    graphics.lineStyle(2, 0xff0000);
    graphics.strokeLineShape(line);
    return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
  }

  damageToPlayer(player, damage, chance = 0) {
    const chanceToHit = Math.random();
    if (chanceToHit < chance / 100) {
      player.setHP(0)
      console.log("no damage taken: ", player.getHP())
    } else {
      player.setHP(damage);
      console.log("taken damage: ",player.getHP())
    }
  }

  // takes in the animation
  // takes in percantage chance for attack to land
  handleMelee(chance) {
    if (this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
      this.damageToPlayer(this.scene.player, this.getMeleeDamage(), chance);
    }

  }

  handleRanged(chance) {
    if(this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
      this.damageToPlayer(this.scene.player, this.getRangeDamage(), chance);
    }
  }
}