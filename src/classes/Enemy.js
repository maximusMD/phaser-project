import { Actor } from "./Actor";

export class Enemy extends Actor {

  #walkSpeed = 15;
  #isDead = false;
  #vision = 100;
  #meleeDamage = 10;
  #rangeDamage = 20;
  #isWandering = true;
  #shootCoolDown = false;
  #scoreWorth = 10;
  #finishAttack = false;
  #aggro = false;
  
  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
  }

  // getters
  getAggro() {
    return this.#aggro;
  }

  getScore() {
    return this.#scoreWorth;
  }

  getFinishAttack() {
    return this.#finishAttack;
  }

  getShootCoolDown() {
    return this.#shootCoolDown;
  }

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
  setAggro(bool) {
    this.#aggro = bool;
  }
  setScore(newScoreWorth) {
    this.#scoreWorth = newScoreWorth;
  }

  setFinishAttack(bool) {
    this.#finishAttack = bool;
  }

  setShootCoolDown() {
    this.#shootCoolDown = !this.getShootCoolDown();
  }

  updateHP(damage) {
    if (this.getHP() <= 0) {
      this.setIsDead();
    } else {
      this.setHP(damage);
    }
  }
  setWalkSpeed(speed) {
    this.#walkSpeed = speed;
  }

  setIsDead() {
    this.#isDead = true;

    this.playDeathAnimAndDestroy()
    // update playerscore upon death
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

    const shouldFlipX = player.getBody().x > enemy.x;
    const flipDirection = enemy.texture.key === 'brain' ? shouldFlipX : !shouldFlipX;

    enemy.setFlipX(flipDirection);
  }

  wander(numTiles, walkKey, idleKey) {

    const distance = 16 * numTiles;



    if (!this.startPos) {
      this.startPos = this.getBody().x;

      this.anims.play(walkKey, true)
      this.setVelocityX(this.getWalkSpeed());

      if (this.getBody().velocity.x < 0) {
        this.setFlipX(true);
      } else if (this.getBody().velocity.x > 0) {
        this.setFlipX(false)
      }

      this.setIsWandering(false);
    }

    const distanceTravelled = Math.abs(this.getBody().x - this.startPos);

    if (distanceTravelled >= distance) {
      this.setVelocityX(0);
      this.setIsWandering(false);
    }

    this.startPos = undefined;
  }

  stopWandering() {
    this.setVelocityX(0);
    this.setIsWandering(false);
  }

  checkDistance(player) {
    return Phaser.Math.Distance.Between(this.getBody().x, this.getBody().y, player.getBody().x, player.getBody().y);
  }

  handleMelee(attack) {
    this.anims.play(attack, true)
    if (this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
      if (this.checkOverlap(this.scene.player)) {
        this.scene.player.setHP(this.getMeleeDamage())
        this.setFinishAttack(false)
      } else {
        this.scene.player.setHP(0);
      }
    }
  }

  handleRanged(attack) {
    this.anims.play(attack, true)

    if (this.anims.currentFrame.index === this.anims.currentAnim.frames.length) {
      this.setVelocity(0);
      this.shootArrow();
      this.anims.stop();
      this.setFinishAttack(false);

    }
  }

  checkOverlap(player) {
    return Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), this.getBounds());
  }

  playDeathAnimAndDestroy() {
    this.anims.play(`${this.texture.key}_die`, true);
    this.scene.hudScene.addScore(this.getScore())
  }

  isNearEdge() {
    const floor = this.scene.ground.tilemap;
    const tileSize = 16;
    const tolerance = 1;

    const feetX = this.x;
    const feetY = this.y + this.height /2;

    const tileCoordinates = floor.worldToTileXY(feetX, feetY);

    const tileAtFeet = floor.getTileAt(tileCoordinates.x, tileCoordinates.y);

    const nextTileCoordinates = floor.worldToTileXY(feetX + tolerance, feetY);
    const tileAtNextFeet = floor.getTileAt(nextTileCoordinates.x, nextTileCoordinates.y);

    return !tileAtFeet || !tileAtNextFeet;
  }
}