import { Actor } from './Actor.js';
import { Enemy } from './Enemy.js';
import { LaserGroup } from './ProjectileGroup.js';

export class RoguePlayer extends Actor {

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
    #isInvul = false;
    #godMode = false;
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
        this.setScale(1.1)
        this.getBody().setSize(20, 27)
        this.getBody().setOffset(5, 7);
        this.laserGroup = new LaserGroup(scene, this.getShootDmg());
    }

    init(player_collider) {
        this.scene.physics.add.collider(this, player_collider);
        this.createAnims();

        this.laser_hit_emitter = this.scene.add.particles(400, 250, 'flare', {
            lifespan: 200,
            speed: { min: 150, max: 250 },
            scale: { start: 0.05, end: 0 },
            blendMode: 'LUMINOSITY',
            tint: 0xbabaf8,
            emitting: false
        });
        this.laser_hit_emitter.setDepth(1);
        this.ground_hit_emitter = this.scene.add.particles(400, 250, 'dust', {
            lifespan: 200,
            speed: { min: 10, max: 20 },
            scale: { start: 0.02, end: 0 },
            blendMode: 'DARKEN',
            emitting: false
        });
        this.ground_hit_emitter.setDepth(1);
        this.allEnemies = this.scene.children.list.filter(x => x instanceof Enemy);
        this.scene.physics.add.overlap(this.laserGroup, this.allEnemies, (...args) => {
            this.handleOverlap(...args) })
        this.scene.physics.add.overlap(this, this.allEnemies, (...args) => {
            this.handleMelee(...args)
        })
    }

    createAnims() {
        this.scene.anims.create({
            key: 'rogue_run',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_run-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'rogue_idle',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_idle-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'rogue_jump',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_jump-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'rogue_midair',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_jump_midair-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'rogue_shoot',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_shoot-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 15,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'rogue_melee',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_melee-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 15,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'rogue_dash',
            frames: this.scene.anims.generateFrameNames('rogue_player', {
                prefix: 'rogue_player_dash-',
                suffix: '.png',
                start: 0,
                end: 7,
            }),
            frameRate: 15,
            repeat: 0,
        });
    }
    
    getGodMode() {
        return this.#godMode;
    }
    setGodMode(bool){
        this.#godMode = bool;
    }
    getIsInvul() {
        return this.#isInvul;
    }
    setIsInvul(bool) {
        return this.#isInvul = bool;
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
    // LASER HANDLER ON SPRITES
    emitLaserHit(sprite) {
        this.laser_hit_emitter.setPosition(sprite.getBody().x + (sprite.getBody().width / 2), sprite.getBody().y + (sprite.getBody().height / 2))
        this.laser_hit_emitter.explode(10)
    }
    emitGroundHit(ground) {
        this.ground_hit_emitter.setPosition(ground.pixelX, this.getBody().y + ((this.getBody().height / 2) - 10))
        this.ground_hit_emitter.explode(10)
    }

    handleOverlap(sprite, overlapSprite) {
        console.log(this)
        if (!overlapSprite.getHasHit()) {
            sprite.setHP(overlapSprite.getLaserDamage());
            this.emitLaserHit(sprite);

        }
        overlapSprite.setHasHit(true);
        overlapSprite.setVisible(false);

        // Reset needs a better more perm solution later
        overlapSprite.body.reset(-400, -400);

    }

    handleGroundHit(projectile, ground) {
        projectile.setVisible(false);
        projectile.body.reset(-400, -400);
        this.emitGroundHit(ground);
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
        !this.getGodMode() && this.setIsInvul(true);
        this.setDashCooldown(true);
        this.setIsDashing(true);
        this.scene.time.delayedCall(dashMultiplier, () => {
            this.setVelocityX(0)
            this.anims?.stop('rogue_dash');
            this.setIsDashing(false);
            !this.getGodMode() && this.setIsInvul(false);
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