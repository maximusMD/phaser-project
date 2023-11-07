import Phaser from "phaser";

export class ProjectileGroup extends Phaser.Physics.Arcade.Group() {
    constructor(scene, projectileType) {
        // Call the super constructor, passing in a world and a scene
        super(scene.physics.world, scene);
        this.createMultiple({
            classType: Laser, // This is the class we create just below
            frameQuantity: 30, // Create 30 instances in the pool
            active: false,
            visible: false,
            key: 'laser'
        })
    }
}

export class Laser extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, w = 10, h = 2, colour = 0xff0000) {
		super(scene, x, y, w, h, colour);
        scene.add.existing(this);
    	}
}   