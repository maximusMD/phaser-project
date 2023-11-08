import { Actor } from './Actor.js';
import { LaserGroup } from './ProjectileGroup.js';

export class RoguePlayer extends Actor {

    // TODOs: add dash distance fall off and timeout

    #dashCooldown = false;
    #dashCooldownSpeed = 1;
    #maxAmmo = 15;
    #meleeDmg = 10;
    #shootDmg = 20;
    #shootingSpeed = 0.8;
    #reloadTime = 1.5;
    #shootCooldown = false;


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

    updateHP(damage) {
        this.setHP(damage)
    }

    update() {
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
        if (this.cursors.dash.isDown && this.body.onFloor()) {
            if (this.scaleX === -1) {
                this.setVelocityX(-500)
                this.anims.play("rogue_dash", true)
            } else {
                this.setVelocityX(500)
                this.anims.play("rogue_dash", true)
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
            this.setVelocityX(-110);
            this.checkFlip();
            this.getBody().setOffset(25, 7);
            if (this.body.onFloor()) {
                this.anims.play('rogue_run', true);
            }
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(110);
            this.checkFlip();
            this.getBody().setOffset(5, 7);
            if (this.body.onFloor()) {
                this.anims.play('rogue_run', true);
            }
        }

        if ((this.cursors.jump.isDown || this.cursors.up.isDown) && this.body.onFloor()) {
            this.setVelocityY(-200);
            this.anims.play('rogue_jump', true)
        }

        if (!this.body.onFloor()) {
            if (this.body.velocity.y > 0) {
                if (this.anims.isPlaying && this.anims.currentAnim.key !== 'rogue_dash') {
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