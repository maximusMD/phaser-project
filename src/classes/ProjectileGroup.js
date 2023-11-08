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
            frameQuantity: 30, 
            active: false,
            visible: false,
            key: "laser",
        })
    
    }

    fireLaser(x, y, direction, laserDamage) {
        console.log(laserDamage)
        const laser = this.getFirstDead(false);
        if (laser) {
            laser.fire(x, y, direction, laserDamage);
        }
    }   

}

export class Laser extends Phaser.Physics.Arcade.Sprite {
    #laserDamage = 10;
    #hasHit = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'laser');
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

    fire(x, y, direction, laserDamage) {
        if (laserDamage) this.setLaserDamage(laserDamage);
        this.body.reset(x, y);

        this.setScale(0.2);
        this.body.setAllowGravity(false);   
        this.angle = 90;

        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(600 * direction);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (!this.scene.cameras.main.worldView.contains(this.body.x,this.body.y)) {
            this.setActive(false);
            this.setVisible(false);
            this.setHasHit(false);
        }
    }
}