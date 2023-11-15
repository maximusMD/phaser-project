import { Enemy } from "./Enemy";
import { getAngle } from "../getAngle";

function* poison_level(index) {
    while (index < 5) {
        yield index++;
    }
}

export class Executioner extends Enemy {
    #poisonEnabled = false;
    #poisonCooldown = false;
    #floatToggle = true;
    #isFloating = false;
    #dashing = false;
    #meleeHit = false;
    #shadowPlayer = true;
    #inAction = false;
    #idling = false;
    #summonAlive = false;
    #frenzyAttack = false;
    #summonCount = 0;
    #attacks = ["frenzyAttack", "offScreenDash", "summon"];

    constructor(scene, x, y, atlas) {
        super(scene, x, y, atlas)
        this.atlas = atlas;
        this.scene = scene;
        // this.setScore(200)
        this.setHP(0, false, 270)
        this.setScale(1.5)
        this.getBody().setAllowGravity(false);
        this.setCollideWorldBounds(false);
        this.getBody().setSize(50, 45)
        this.scene.poison_zone = new Phaser.Geom.Rectangle(0, this.getBody().y + this.getBody().height, this.scene.ground2.width, this.getBody().height / 2)
        this.createAnims()
        this.summons = new SummonGroup(scene, this)
        this.scene.sprite_hit_emitter = this.scene.add.particles(400, 250, 'sprite_explode', {
            lifespan: 200,
            speed: { min: 30, max: 50 },
            scale: { start: 0.05, end: 0 },
            blendMode: 'LUMINOSITY',
            tint: 0xbabaf8,
            emitting: false
        });
        this.scene.physics.add.overlap(this.getBody(), this.scene.player.getBody(), (...args) => {
            this.handleMelee(...args)
        })
        this.maxHealth = this.getHP();
    }
    setSummonCount(num) {
        this.#summonCount = num;
    }
    getSummonCount() {
        return this.#summonCount;
    }
    setFrenzyAttack(bool) {
        this.#frenzyAttack = bool;
    }
    getFrenzyAttack() {
        return this.#frenzyAttack;
    }
    setSummonAlive(bool) {
        this.#summonAlive = bool;
    }
    getSummonAlive() {
        return this.#summonAlive;
    }
    getIdling() {
        return this.#idling;
    }
    setIdling(bool) {
        this.#idling = bool;
    }
    getInAction() {
        return this.#inAction;
    }
    toggleInAction() {
        this.#inAction = !this.#inAction;
    }
    getShadowPlayer() {
        return this.#shadowPlayer;
    }
    toggleShadowPlayer() {
        this.#shadowPlayer = !this.#shadowPlayer;
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
            key: 'executioner_dash_attack',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'attacking-',
                suffix: '.png',
                start: 0,
                end: 2
            }),
            frameRate: 2,
            repeat: 0,
        })
        this.anims.create({
            key: 'executioner_idle2',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'idle2-',
                suffix: '.png',
                attack: 0,
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
                attack: 0,
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
                attack: 0,
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
                end: 12,
                repeat: -1
            }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'executioner_death',
            frames: this.scene.anims.generateFrameNames('executioner', {
                prefix: 'death-',
                suffix: '.png',
                attack: 0,
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
                attack: 0,
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
                end: 4,
                hold: 1000
            }),
            frameRate: 10,
            repeat: 0
        })
    }


    floating() {
        this.attackY = this.attackY ?? this.getBody().y;
        if (this.getFloatToggle()) {
            this.getBody().setVelocityY(-5);
            if (this.getBody().y <= this.attackY - 5) {
                this.attackY = undefined;
                this.setFloatToggle();
            }
        } else {
            this.getBody().setVelocityY(5);
            if (this.getBody().y >= this.attackY + 5) {
                this.attackY = undefined;
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
                attack: 0,
                end: 0.3,
                ease: (t) => 0.5 * Phaser.Math.Easing.Cubic.InOut(t > 0.5 ? 2 - 2 * t : 2 * t)
            },
            maxAliveParticles: 60,
            lifespan: { min: 200, max: 8000 },
            frequency: 5,
            bounce: 0.4,
            bounds: this.scene.poison_zone,
            speedY: { min: -20, max: 30 },
            speedX: { min: -10, max: 15 },
            blendMode: 'LIGHTEN',
        })
        this.scene.poison.addEmitZone({ type: 'random', source: this.scene.poison_zone, seamless: true })
        this.setPoisonEnabled(true);
    }

    poisonPlayer() {
        if (!this.getPoisonCooldown()) {
            // this.scene.player.setHP(5)
            console.log("Poisoning: PlayerHP: " + this.scene.player.getHP())
            this.setPoisonCooldown(true);
            this.scene.time.delayedCall(1000, () => { this.setPoisonCooldown(false) });
        }
    }
    summon() {
        if (this.getSummonCount() < 3) {
            if (!this.getSummonAlive()) {
                this.summons.showSummon(
                    this.getCenter().x,
                    this.getCenter().y - 50 * (this.getSummonCount() + 1),
                    this.getSummonCount()
                );
                this.setSummonAlive(true);
                this.setSummonCount(this.getSummonCount() + 1);
                this.anims.play("executioner_summon", true);
                this.scene.time.delayedCall(2000, () => {
                    this.setSummonAlive(false);
                    this.anims.play("executioner_idle2");
                });
            }
        } else {
            this.setIdling(true);
            // if (this.getInAction()) this.toggleInAction();
            this.scene.time.delayedCall(3000, () => {
                this.setIdling(false)
                this.setSummonCount(0);
                this.randomAttack = undefined;
            });
        }
    }

    offScreenDash() {
        if (!this.getInAction()) {
            this.toggleInAction();
            this.scene.dash_overlay.setAlpha(0.8);
            this.setAlpha(0);
            this.setVelocityX(0);
            this.setX(500)

            if (!this.getShadowPlayer()) this.toggleShadowPlayer();
            this.scene.time.delayedCall(3000, () => {
                this.toggleShadowPlayer()
                this.toggleDashing()
            });
        }

        if (this.getInAction()) {
            if (this.getShadowPlayer()) {
                this.setY(
                    this.scene.player.getCenter().y + this.scene.player.getBody().height / 2
                )
                this.scene.dash_overlay.setY(
                    this.scene.player.getCenter().y + this.scene.player.getBody().height / 2
                )
            } else {
                if (this.getDashing()) {
                    this.setAlpha(1)
                    this.setVelocityX(-500)
                }
                if (this.getBody().x < -20) {
                    if (this.getDashing()) this.toggleDashing();
                    this.scene.dash_overlay.setAlpha(0);
                    this.setIdling(true);
                    this.randomAttack = undefined;
                    if (this.getInAction()) this.toggleInAction();
                    this.scene.time.delayedCall(3000, () => { this.setIdling(false) });
                }
            }
        }
    }

    idling() {
        if (!this.anims.isPlaying) {
            this.anims.play("executioner_idle2"), true;
        }
        const { angleDeg } = getAngle(this.scene.player, this);
        this.scene.physics.velocityFromAngle(angleDeg, 20, this.getBody().velocity)
    }

    frenzyAttack() {
        if (!this.getInAction()) {
            this.toggleInAction();
            this.setFrenzyAttack(true);
            this.scene.time.delayedCall(5000, () => {
                this.setFrenzyAttack(false);
            });

        }
        if (this.getFrenzyAttack()) {
            this.anims.play("executioner_frenzy", true);
            if (!this.checkPlayerOverlap()) {
                const { angleDeg } = getAngle(this.scene.player, this);
                this.scene.physics.velocityFromAngle(angleDeg, 120, this.getBody().velocity)
            }
        } else {
            this.randomAttack = undefined;
            this.anims.stop("executioner_frenzy", true)
            this.setIdling(true);
            if (this.getInAction()) this.toggleInAction();
            this.scene.time.delayedCall(3000, () => { this.setIdling(false) });
        }
    }

    checkPlayerOverlap() {
        return Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.scene.player.getBounds())
    }

    handleMelee() {
        if (this.getInAction()) {
            // handle dash melee
            if (this.getDashing()) {
                this.anims.playReverse("executioner_dash_attack", true);
                if (this.anims.currentFrame.frame.name === "attacking-2.png") {
                    if (!this.getMeleeHit()) {
                        // this.scene.player.setHP(25);
                        console.log("Dash hit")
                        this.toggleMeleeHit();
                        this.scene.time.delayedCall(1000, () => { this.toggleMeleeHit() });
                    }
                }
            }

            // handle frenzy melee
            if (this.anims.isPlaying && this.anims.currentAnim.key === "executioner_frenzy") {
                if (this.anims.currentFrame.frame.name === "attacking-9.png" || this.anims.currentFrame.frame.name === "attacking-2.png") {

                    if (!this.getMeleeHit()) {
                        console.log("frenzy hit")
                        // this.scene.player.setHP(5)
                        this.toggleMeleeHit();
                        this.scene.time.delayedCall(500, () => { this.toggleMeleeHit() });
                    }
                }
            }
        } else {
            this.anims.play("executioner_attacking", true);
        }
    }

    handleCompleteAnims(e) {
        //e.key
        if(e.key === 'executioner_death') {
            this.destroy();
        }
    }
    handleStoppedAnims(e) {
        // e.key
    }

    // playDeathAnimAndDestroy() {
    //     this.anims.play(`${this.texture.key}_death`, true);
    //     this.scene.hudScene.addScore(this.getScore())
    // }

    update() {
        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);
        if (this.getHP() < 250 && !this.getPoisonEnabled()) {
            this.createPoison();
        }

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
        // in action checks
        if (!this.getIdling()) {
            this.randomAttack = this.randomAttack ?? this.#attacks[Math.floor(Math.random() * this.#attacks.length)];
            this[this.randomAttack]();
        } else {
            this.idling();
        }

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

        this.scene.summon_sprites = this.createMultiple({
            classType: ExecutionerSummon,
            quantity: 10,
            active: false,
            visible: false,
            key: "executioner",
        })
    }

    showSummon(x, y, index) {
        const summon = this.getChildren().find((_, i) => i === index);
        summon.show(x, y);
    }
}

export class ExecutionerSummon extends Enemy {
    #travelling = false;
    #isAlive = false;
    #hasHit = false;
    #shownDead = false;

    constructor(scene, x, y, atlas) {
        super(scene, x, y, atlas)
        this.scene = scene;
        this.createAnims();
        this.setHP(0, false, 10);
        this.getBody().setSize(20, 20)
        this.getBody().setOffset(15, 18)
        this.getBody().setAllowGravity(false);
        this.setCollideWorldBounds(false);
        this.scene.physics.add.overlap(this, this.scene.player,
            (...args) => { this.handleHit(...args) })
    }

    show(x, y) {
        this.body.reset(x, y);
        this.setHP(0, false, 10);
        this.getBody().setAllowGravity(false);
        this.setActive(true);
        this.setVisible(true);
        this.setIsAlive(true);
        this.setShownDead(false);
        this.anims.play("summon_appear")
        this.scene.time.delayedCall(500, () => { this.attack() });
    }
    getShownDead() {
        return this.#shownDead
    }
    setShownDead(bool) {
        this.#shownDead = bool;
    }
    getHasHit() {
        return this.#hasHit;
    }
    setHasHit(bool) {
        this.#hasHit = bool;
    }
    toggleTravelling() {
        this.#travelling = !this.#travelling;
    }
    setIsAlive(bool) {
        this.#isAlive = bool;
    }
    getIsAlive() {
        return this.#isAlive;
    }
    getTravelling() {
        return this.#travelling;
    }

    handleHit(_, player) {
        if (!this.getHasHit()) {
            console.log(player)
            // player.setHP(10);
            this.setHasHit(true);
        }
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
                attack: 0,
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
                attack: 0,
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
                attack: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        })
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.scene.cameras.main.worldView.contains(this.body.x, this.body.y)) {
            this.setActive(false);
            this.setVisible(false);
            this.setIsAlive(false)
            this.setShownDead(false);
            if (this.getTravelling()) this.toggleTravelling();
        }
    }

    handleDeath() {
        if (!this.getShownDead()) {
            this.setActive(false);
            this.setVisible(false);
            this.setIsAlive(false);
            this.scene.sprite_hit_emitter.setPosition(
                this.scene.player.getCenter().x,
                this.scene.player.getCenter().y
            )
            this.scene.sprite_hit_emitter.explode(20)
            this.setShownDead(true);
            this.getBody().reset(-400, -400);
        }
    }
    handleCompleteAnims(e) {

    }
    handleStoppedAnims(e) {

    }

    update() {
        this.on('animationcomplete', this.handleCompleteAnims);
        this.on('animationstop', this.handleStoppedAnims);

        this.anims.play('summon_idle');

        if (this.getHP() <= 0) {
            this.handleDeath();
        }
        if (!this.#travelling) {
            this.facePlayer()
        }

    }
}
