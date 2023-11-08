import { Actor } from "./Actor";
import { Enemy } from "./Enemy";

export class SkeletonArcher extends Enemy {

  constructor(scene, x, y, enemyModel) {
    super(scene, x, y, enemyModel);
    this.shoot = false;
    this.setScale(0.6)
    this.getBody().setSize(45, 55);
    this.getBody().setOffset(36, (this.height / 2) + 10)

    this.setVision(100);

    this.createAnimations();
  }
  createAnimations() {
    this.scene.anims.create({
      key: 'skeleton_archer_idle',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_idle-',
        suffix: '.png',
        start: 1,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'skeleton_archer_attack_1',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_shoot1-',
        suffix: '.png',
        start: 1,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'skeleton_archer_attack_2',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_shoot2-',
        suffix: '.png',
        start: 0,
        end: 14
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'skeleton_archer_evasion',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_evasion-',
        suffix: '.png',
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: 0
    })

    this.scene.anims.create({
      key: 'skeleton_archer_hurt',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_hurt-',
        suffix: '.png',
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: 0
    })

    this.scene.anims.create({
      key: 'skeleton_archer_dead',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_dead-',
        suffix: '.png',
        start: 0,
        end: 4,
      }),
      frameRate: 4,
      repeat: 0
    })

    this.scene.anims.create({
      key: 'skeleton_archer_melee_1',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_melee1-',
        suffix: '.png',
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'skeleton_archer_melee_2',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_melee2-',
        suffix: '.png',
        start: 0,
        end: 3
      }),
      frameRate: 6,
      repeat: -1,
      delay: 500
    })

    this.scene.anims.create({
      key: 'skeleton_archer_melee_3',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_melee3-',
        suffix: '.png',
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'skeleton_archer_walk',
      frames: this.scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_walk-',
        suffix: '.png',
        start: 1,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    })

  }

  update(player, graphics, line) {

    const distance = this.checkDistance(player, graphics, line)

    if (distance <= this.getVision()) {
      this.shoot = true;

      line.setTo(
        this.getBody().x,
        this.getBody().y,
        player.getBody().x,
        player.getBody().y
      );
    } else {
      graphics.clear();
      this.shoot = false;
    }

    if (this.shoot) {
      this.facePlayer(player, this)
      if (distance < 50) {
        this.anims.play('skeleton_archer_melee_2', true)
        if (this.anims.currentFrame.index === 4) {
          this.damageToPlayer(player, 1, 20);
        }
      } else {
        this.anims.play('skeleton_archer_attack_1', true)
      }
    } else {
      this.anims.play('skeleton_archer_idle', true);
    }

  }
}