import { Actor } from './Actor.js';
// import { ProjectileGroup } from './ProjectileGroup.js';

export class RoguePlayer extends Actor {

    #dashTimeOut = false;

    constructor(scene, x, y, playerModel) {
        super(scene, x, y, playerModel);
        this.cursors = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W, 'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A, 'right': Phaser.Input.Keyboard.KeyCodes.D, 'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'melee': Phaser.Input.Keyboard.KeyCodes.M, 'shoot': Phaser.Input.Keyboard.KeyCodes.K, 'dash': Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        this.getBody().setSize(20, 25)
        this.getBody().setOffset(5, 10);
        this.createAnimations();
    }

    createAnimations() {
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

    update() {
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
            this.anims.play("rogue_shoot", true)
        } else if (this.cursors.melee.isDown) {
            this.anims.play("rogue_melee", true)
        }

        if (this.cursors.left.isDown) {
            this.setVelocityX(-110);
            this.checkFlip();
            this.getBody().setOffset(30, 10);
            if (this.body.onFloor()) {
                this.anims.play('rogue_run', true);
            }
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(110);
            this.checkFlip();
            this.getBody().setOffset(5, 10);
            if (this.body.onFloor()) {
                this.anims.play('rogue_run', true);
            }
        }

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.body.onFloor()) {
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
                !this.anims.isPlaying && this.anims.play('rogue_idle', true)
            }
        }

    }
}