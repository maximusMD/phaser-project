import Phaser from "phaser";

export class LaserGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;

        // ---- 
        // Maybe change this to ammo size of player instance
        // or deal with ammo and reload seperate. TBD

        this.createMultiple({
            classType: Laser,
            setScale: { x: 0.05, y: 0.05 },
            frameQuantity: 5,
            active: false,
            visible: false,
            key: "laser",
        })

    }

    fireLaser(x, y, direction, laserDamage) {
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y, direction, laserDamage);
            this.scene.laser_sfx.play();
        }
    }
}

export class Laser extends Phaser.Physics.Arcade.Sprite {
    #laserDamage = 10;
    #hasHit = true;

    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
        this.scene = scene;
    }
    getHasHit() {
        return this.#hasHit;
    }
    setHasHit(bool) {
        this.#hasHit = bool;
    }
    getLaserDamage() {
        return this.#laserDamage;
    }
    setLaserDamage(damage) {
        this.#laserDamage = damage;
    }
    handleGroundHit(projectile, ground) {
        console.log(ground)
        // console.log("here")  
        projectile.setActive(false);
        projectile.setVisible(false);
        projectile.body.reset(-400, -400);
        this.scene.player.emitGroundHit(ground);
    }

    fire(x, y, direction, laserDamage) {
        this.setHasHit(false);
        this.scene.physics.add.collider(this, this.scene.player.ground_collider,
            (...args) => { this.handleGroundHit(...args) });
        if (laserDamage) this.setLaserDamage(laserDamage);
        this.body.reset(x, y);
        this.setScale(0.05);
        this.setTint(0xbabaf8);
        this.body.setAllowGravity(false);
        this.angle = 90;

        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(600 * direction);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.scene.cameras.main.worldView.contains(this.body.x, this.body.y)) {
            this.setActive(false);
            this.setVisible(false);
            this.setHasHit(false);
        }
    }
}

export class ArrowGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;

        this.createMultiple({
            classType: Arrow,
            frameQuantity: 3,
            active: false,
            visible: false,
            key: "arrow",
        })

    }
    fireArrow(x, y, direction, arrowDamage) {
        const arrow = this.getFirstDead(false);
        if (arrow) {
            arrow.fire(x, y, direction, arrowDamage);
            this.scene.arrow_sfx.play();
        }
    }
}


export class Arrow extends Phaser.Physics.Arcade.Sprite {
    #arrowDamage = 10;
    #hasHit = true;

    constructor(scene, x, y) {
        super(scene, x, y, 'arrow');
    }
    getHasHit() {
        return this.#hasHit;
    }
    setHasHit(bool) {
        this.#hasHit = bool;
    }
    getArrowDamage() {
        return this.#arrowDamage;
    }
    setArrowDamage(damage) {
        this.#arrowDamage = damage;
    }

    handleGroundHit(arrow) {
        arrow.setActive(false)
        arrow.setVisible(false)
        arrow.body.reset(-400, -400)
    }

    fire(x, y, direction, arrowDamage) {
        this.scene.physics.add.collider(this, this.scene.player.ground_collider,
            this.handleGroundHit)
        if (arrowDamage) this.setArrowDamage(arrowDamage);
        this.body.reset(x, y);

        this.setScale(0.5);
        this.body.setSize(this.width - 15, 5)
        this.body.setAllowGravity(false);
        this.angle = 180

        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(180 * direction);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.scene.cameras.main.worldView.contains(this.body.x, this.body.y)) {
            this.setActive(false);
            this.setVisible(false);
            this.setHasHit(false);
        }
    }
}