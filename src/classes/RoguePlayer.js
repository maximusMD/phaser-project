import { Actor } from './Actor.js';
import { Enemy } from './Enemy.js';
import { LaserGroup } from './ProjectileGroup.js';

export class RoguePlayer extends Actor {

    // TODOs: add dash distance fall off and timeout

    #dashCooldown = false;
    #dashCooldownSpeed = 200;
    #isDashing = false;
    #airDashCount = 0;
    #airDashLimit = 2;
    #dashDistanceMultiplier = 1.5;
    #landed = false;
    #meleeCooldown = false;
    #maxAmmo = 15;
    #runSpeed = 110;
    #meleeDmg = 10;
    #shootDmg = 20;
    #shootingSpeed = 0.8;
    #reloadTime = 1.5;
    #shootCooldown = false;
    #multipleJumps = true;
    #jumpCount = 0;
    #maxJumps = 2;
    #isJumping = true;


    constructor(scene, x, y, playerModel) {
        super(scene, x, y, playerModel);
        this.cursors = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D, 'jump': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'melee': Phaser.Input.Keyboard.KeyCodes.M, 'shoot': Phaser.Input.Keyboard.KeyCodes.K, 'dash': Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        this.scene = scene;
        this.setScale(1.2)
        this.getBody().setSize(20, 27)
        this.getBody().setOffset(5, 7);
        this.laserGroup = new LaserGroup(scene, this.getShootDmg());
        scene.physics.add.overlap(this, scene.allEnemies, (_, enemy) => {
            this.handleMelee(_, enemy)
        })
    }
    getIsJumping() {
        return this.#isJumping;
    }
    setIsJumping(bool) {
        this.#isJumping = bool;
    }
    getJumpCount() {
        return this.#jumpCount;
    }
    getMultipleJumps() {
        return this.#multipleJumps;
    }
    getMaxJumps() {
        return this.#maxJumps;
    }
    getDashDistanceMultiplier() {
        return this.#dashDistanceMultiplier;
    }
    getAirDashLimit() {
        return this.#airDashLimit;
    }
    getAirDashCount() {
        return this.#airDashCount;
    }
    getLanded() {
        return this.#landed
    }
    getIsDashing() {
        return this.#isDashing;
    }
    getRunSpeed() {
        return this.#runSpeed;
    }
    getMeleeCooldown() {
        return this.#meleeCooldown;
    }
    getShootDmg() {
        return this.#shootDmg;
    }
    getMeleeDmg() {
        return this.#meleeDmg;
    }
    getShootCoolDown() {
        return this.#shootCooldown;
    }
    getShootingSpeed() {
        return this.#shootingSpeed;
    }
    getReloadTime() {
        return this.#reloadTime;
    }
    getMaxAmmo() {
        return this.#maxAmmo;
    }
    getDashCooldown() {
        return this.#dashCooldown;
    }
    getDashCooldownSpeed() {
        return this.#dashCooldownSpeed;
    }
    setRelodTime(newTime) {
        this.#reloadTime = newTime;
    }
    setMaxAmmo(ammo) {
        this.#maxAmmo = ammo;
    }
    setDashCooldown() {
        this.#dashCooldown = !this.#dashCooldown;
    }
    setDashCooldownSpeed(speed) {
        this.#dashCooldownSpeed = speed;
    }
    setShootCoolDown(bool) {
        this.#shootCooldown = bool;
    }
    setShootingSpeed(speed) {
        this.#shootingSpeed = speed;
    }
    setMeleeDmg(dmg) {
        this.#meleeDmg = dmg;
    }
    setShootDmg(dmg) {
        this.#shootDmg = dmg;
    }
    setMeleeCooldown(bool) {
        this.#meleeCooldown = bool;
    }
    setRunSpeed(speed) {
        this.#runSpeed = speed;
    }
    setIsDashing(bool) {
        this.#isDashing = bool;
    }
    setLanded(bool) {
        this.#landed = bool;
    }
    resetAirDashCount() {
        this.#airDashCount = 0;
    }
    resetJumpCount() {
        this.#jumpCount = 0;
    }
    addAirDashCount() {
        this.#airDashCount++;
    }
    addJumpCount() {
        this.#jumpCount++;
    }
    setAirDashLimit(limit) {
        this.#airDashLimit = limit;
    }
    setDashDistanceMultiplier(multiplier) {
        this.#dashDistanceMultiplier = multiplier;
    }
    setMultipleJumps(bool) {
        this.#multipleJumps = bool;
    }


    handleMelee(_, enemy) {
        if (this.anims.isPlaying && this.anims.currentAnim.key === "rogue_melee") {
            if (this?.anims?.currentFrame.index === 5) {
                if (!this.getMeleeCooldown()) {
                    enemy.setHP(this.getMeleeDmg())
                    console.log(enemy.getHP())
                    this.setMeleeCooldown(true);
                }
            }
        }
    }

    shootLaser() {
        let x = this.body.x
        if (this.scaleX === 1) {
            x += 27;
        }
        this.laserGroup.fireLaser(x, this.body.y + 10, this.scaleX, this.getShootDmg())
    }

    damageToEnemy(enemy, damage) {
        enemy.updateHP(damage)
    }

    dash() {
        if (!this.getBody().onFloor()) {
            if (this.getAirDashCount() < this.getAirDashLimit()) {
                this.addAirDashCount();
                this.setVelocityY(0);
                this.getBody().setAllowGravity(false);
            } else {
                return;
            }
        }
        const dashMultiplier = 200 + this.getDashDistanceMultiplier();
        this.anims.play("rogue_dash", true);
        this.setVelocityX(500 * this.scaleX);
        this.setDashCooldown(true);
        this.setIsDashing(true);
        this.scene.time.delayedCall(dashMultiplier, () => {
            this.setVelocityX(0)
            this.anims?.stop('rogue_dash');
            this.setIsDashing(false);
        })
        this.scene.time.delayedCall(dashMultiplier + this.getDashCooldownSpeed(), () => { this.setDashCooldown(false) });
    }

    // Put any actions need for a complete anims in here
    handleCompleteAnims(e) {
        if (e.key === "rogue_melee") {
            this.setMeleeCooldown(false);
        }
        if (e.key === "rogue_dash") {
            this.getBody().setAllowGravity(true);
            if (!this.getBody().onFloor()) {
                this.anims.play('rogue_midair', true);
            }
        }
        if (e.key === "rogue_jump") {
            this.setIsJumping(false);
        }
    }
    handleStoppedAnims(e) {
        if (e.key === "rogue_melee") {
            this.setMeleeCooldown(false);
        }
        if (e.key === "rogue_dash") {
            this.getBody().setAllowGravity(true);
            if (!this.getBody().onFloor()) {
                this.anims.play('rogue_midair', true);
            }
        }
        if (e.key === "rogue_jump") {
            this.setIsJumping(false);
        }
    }
    update() {
        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);
        if (this.getBody().onFloor() && !this.getLanded()) {
            this.getLanded(true);
            this.setIsJumping(false);
            this.resetJumpCount();
            this.resetAirDashCount();
        }
        if (this.anims?.currentAnim?.key === "rogue_shoot") {
            if (this.anims.currentFrame.index === 6) {
                if (!this.getShootCoolDown()) {
                    this.shootLaser();
                }
                this.setShootCoolDown(true);
                this.scene.time.delayedCall(100 * this.getShootingSpeed(), () => { this.setShootCoolDown(false) })
            }
        }

        if (this.anims.isPlaying && this.anims.currentAnim.key !== 'rogue_dash') {
            this.setVelocityX(0);
        }
        if (this.cursors.dash.isDown) {
            if (!this.getIsDashing() && !this.getDashCooldown()) {
                this.dash();
            }
        }

        if (this.cursors.shoot.isDown) {
            if (this.anims.currentAnim?.key !== 'rogue_shoot' && !this.getShootCoolDown()) {
                this.anims.play("rogue_shoot", true)
            }
        } else if (this.cursors.melee.isDown) {
            this.anims.play("rogue_melee", true)
        }

        if (this.cursors.left.isDown) {
            if (!this.getIsDashing()) {
                this.setVelocityX(-(this.getRunSpeed()));
                this.checkFlip();
                this.getBody().setOffset(25, 7);
                if (this.body.onFloor()) {
                    this.anims.play('rogue_run', true);
                }
            }
        }
        else if (this.cursors.right.isDown) {
            if (!this.getIsDashing()) {
                this.setVelocityX(this.getRunSpeed());
                this.checkFlip();
                this.getBody().setOffset(5, 7);
                if (this.body.onFloor()) {
                    this.anims.play('rogue_run', true);
                }
            }
        }

        if ((this.cursors.jump.isDown || this.cursors.up.isDown)) {
            if (this.getJumpCount() < this.getMaxJumps() && !this.getIsJumping()) {
                this.setVelocityY(-200);
                this.setIsJumping(true);
                this.addJumpCount();
                this.anims.play("rogue_jump", true)
            }
        }

        if (!this.body.onFloor()) {
            if (this.body.velocity.y > 0) {
                if (this.anims?.currentAnim?.key !== 'rogue_dash' || this.anims?.currentAnim?.key !== 'rogue_shoot') {
                    this.anims.play('rogue_midair', true)
                }
            }
        } else {
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'rogue_shoot' && this.anims.currentAnim.key !== 'rogue_melee') {
                    this.anims.play('rogue_idle', true)
                }
            }
        }
    }
}