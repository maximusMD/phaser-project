import { Actor } from "./Actor";

export class Enemy extends Actor {

  #walkSpeed = 10
  #isDead = false;
  #vision = 100;

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

  // setters
  updateHP(damage) {
    this.setHP(damage);
    if(this.getHP() <= 0) {
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
  
  // functions
  facePlayer(player, enemy) {
    // console.log(player)
    if (player.getBody().x < enemy.x) {
      enemy.setFlipX(true);
    } else {
      enemy.setFlipX(false);
    }
  }

  checkDistance(player, graphics, line) {
    graphics.clear();

    graphics.lineStyle(2, 0xff0000);
    graphics.strokeLineShape(line);
    return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
  }

  damageToPlayer(player, damage, chance = 0) {
    const chanceToHit = Math.random();
    if (chanceToHit < chance/100) {
      player.updateHP(0)
      console.log("not taken damage: ", player.getHP())
    } else {
      player.updateHP(damage);
      console.log("taken damage: ", player.getHP())
    }
  }
}