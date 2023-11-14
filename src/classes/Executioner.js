import { Enemy } from "./Enemy";
import { getAngle } from "../getAngle";

export class Executioner extends Enemy {
    #poisonEnabled = false;
    #poisonCooldown = false;
    #floatToggle = true;
    #isFloating = true;
    #dashing = false;
    #meleeHit = false;

    constructor(scene, x, y, atlas) {
        super(scene, x, y, atlas)
        this.atlas = atlas;
        this.scene = scene;
        this.setHP(-1000)
        this.setScale(1.5)
        this.getBody().setAllowGravity(false);
        this.setCollideWorldBounds(false);
        this.getBody().setSize(30, 45)
        this.scene.poison_zone = new Phaser.Geom.Rectangle(0, this.getBody().y + this.getBody().height, this.scene.ground.width, this.getBody().height / 2)
        this.createAnims()
        this.summons = new SummonGroup(scene, this)
    }
    getMeleeHit() {
        return this.#meleeHit;
    }
    toggleMeleeHit() {
        this.#meleeHit = !this.#meleeHit;
    }
    getDashing() {
        return this.#dashing;
    }
    toggleDashing() {
        this.#dashing = !this.#dashing;
    }
    setFloatToggle() {
        this.#floatToggle = !this.#floatToggle;
    }
    getFloatToggle() {
        return this.#floatToggle;
    }
    setIsFloating(bool) {
        this.#isFloating = bool;
    }
    getIsFloating() {
        return this.#isFloating;
    }
    setPoisonCooldown(bool) {
        this.#poisonCooldown = bool;
    }
    getPoisonCooldown() {
        return this.#poisonCooldown;
    }
    getPoisonEnabled() {
        return this.#poisonEnabled;
    }
    setPoisonEnabled(bool) {
        this.#poisonEnabled = bool;
    }
    createAnims() {
        this.anims.create({
            key: 'executioner_idle2',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'idle2-',
                suffix: '.png',
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'executioner_idle',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'idle-',
                suffix: '.png',
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'executioner_attacking',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'attacking-',
                suffix: '.png',
                start: 0,
                end: 12
            }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'executioner_frenzy',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'attacking-',
                suffix: '.png',
                start: 0,
                frameRate: 20,
                end: 12
            }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'executioner_death',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'death-',
                suffix: '.png',
                start: 0,
                end: 17
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'executioner_skill1',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'skill1-',
                suffix: '.png',
                start: 0,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'executioner_summon',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'summon-',
                suffix: '.png',
                start: 0,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        })
    }
    floating() {
        this.startY = this.startY ?? this.getBody().y;
        if (this.getFloatToggle()) {
            this.getBody().setVelocityY(-5);
            if (this.getBody().y <= this.startY - 5) {
                this.startY = undefined;
                this.setFloatToggle();
            }
        } else {
            this.getBody().setVelocityY(5);
            if (this.getBody().y >= this.startY + 5) {
                this.startY = undefined;
                this.setFloatToggle();
            }
        }
    }

    createPoison() {
        this.scene.poison = this.scene.add.particles(-10, 150, 'poison_1', {
            scale: { min: 0.05, max: 0.7 },
            angle: { min: 0, max: 360, random: true },
            gravityY: 5,
            alpha: {
                start: 0,
                end: 0.3,
                ease: (t) => 0.5 * Phaser.Math.Easing.Cubic.InOut(t > 0.5 ? 2 - 2 * t : 2 * t)
            },
            maxAliveParticles: 60,
            lifespan: { min: 200, max: 8000 },
            frequency: 5,
            bounce: 0.4,
            bounds: this.scene.poison_zone,
            speedY: { min: -20, max: 30 },
            speedX: { min: -10, max: 15},
            blendMode: 'LIGHTEN',
        })
        this.scene.poison.addEmitZone({ type: 'random', source: this.scene.poison_zone, seamless: true })
        this.setPoisonEnabled(true);
    }

    poisonPlayer() {
        if (!this.getPoisonCooldown()) {
            this.scene.player.setHP(5)
            console.log("Poisoning: PlayerHP: " + this.scene.player.getHP())
            this.setPoisonCooldown(true);
            this.scene.time.delayedCall(1000, () => { this.setPoisonCooldown(false) });
        }
    }
    summonPoison() {

    }
    frenzyAttack() {
        if (!this.checkPlayerOverlap()) {
            const { angleDeg } = getAngle(this.scene.player, this);
            this.scene.physics.velocityFromAngle(angleDeg, 150, this.getBody().velocity)
        }
        this.anims.play("executioner_frenzy", true);
    }
    checkPlayerOverlap() {
        return Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.scene.player.getBounds())
    }
    handleCompleteAnims(e) {
        if (e.key === "executioner_frenzy") {

        }
    }
    handleStoppedAnims(e) {
        // e.key
    }
    update() {
        if (!this.checkPlayerOverlap()) {
            if (this.getBody().x > this.scene.player.getBody().x) {
                this.setFlipX(true);
            } else {
                this.setFlipX(false);
            }
        }
        if (this.getPoisonEnabled() && Phaser.Geom.Intersects.RectangleToRectangle(this.scene.player.getBounds(), this.scene.poison_zone)) {
            this.poisonPlayer();
        }
        if (this.getIsFloating()) {
            this.anims.play("executioner_idle2", true)
            this.floating();
        }
        // handle frenzy melee
        if (this.anims.isPlaying && this.anims.currentAnim.key === "executioner_frenzy") {
            if (this.anims.currentFrame.frame.name === "attacking-9.png" || this.anims.currentFrame.frame.name === "attacking-2.png") {
                if (this.checkPlayerOverlap()) {
                    if (!this.getMeleeHit()) {
                        this.scene.player.setHP(10)
                        this.toggleMeleeHit ();
                        this.scene.time.delayedCall(250, () => { this.toggleMeleeHit() });
                    }
                }
            }
        }


        // this.frenzyAttack();

    }
}
export class SummonGroup extends Phaser.Physics.Arcade.Group {
    #summoner;
    constructor(scene, summoner) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.#summoner = summoner;

        this.shieldCircle = new Phaser.Geom.Circle(this.#summoner.getCenter().x,
            this.#summoner.getCenter().y
            , 20);

        this.scene.summon_things = this.createMultiple({
            classType: ExecutionerSummon,
            quantity: 10,
            active: false,
            visible: false,
            key: "executioner",
        })
    }
    // shieldSummoner() {

    //     const summons = this.getChildren();
    //     const circle = this.shieldCircle;
    //     const summoner = this.#summoner;

    //     Phaser.Actions.PlaceOnCircle(summons, circle);
    //     this.scene.summon_tween = this.scene.tweens.add({
    //         targets: summons,
    //         radius: 20,
    //         repeat: -1,
    //         onUpdate: function ()
    //         {   
    //             Phaser.Actions.RotateAroundDistance(summons, { x: summoner.getCenter().x, y: summoner.getCenter().y }, 0.02, 50);
    //         }
    //         }
    //     );
    // }
}

export class ExecutionerSummon extends Enemy {
    #travelling = false;
    constructor(scene, x, y, atlas) {
        super(scene, x, y, atlas)
        this.scene = scene;
        this.createAnims();
        this.getBody().setSize(20, 20)
        this.getBody().setOffset(15, 18)
        this.getBody().setAllowGravity(false);
        this.setCollideWorldBounds(false);
        this.scene.physics.add.collider(this, this.scene.player,
            (...args) => { this.handleHit(...args) })
    }

    toggleTravelling() {
        this.#travelling = !this.#travelling;
    }

    getTravelling() {
        return this.#travelling;
    }

    handleHit() {
        console.log("hit!")
    }

    facePlayer() {
        const { angleDeg } = getAngle(this, this.scene.player)
        this.angle = angleDeg + 90;
    }

    attack() {
        if (!this.#travelling) {
            this.attackAngle = this.angle + 90;
            this.scene.physics.velocityFromAngle(this.attackAngle, 300, this.getBody().velocity)
            this.toggleTravelling();
        }
    }

    createAnims() {
        this.anims.create({
            key: 'summon_death',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'summonDeath-',
                suffix: '.png',
                start: 0,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'summon_idle',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'summonIdle-',
                suffix: '.png',
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'summon_appear',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'summonAppear-',
                suffix: '.png',
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
        if (!this.#travelling) {
            this.facePlayer()
        }

        if (!this.anims.isPlaying) {
            this.anims.play('summon_idle');
        }
    }
}
