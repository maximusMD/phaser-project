export function createAnimations(scene) {
    scene.anims.create({
        key: 'rogue_run',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_run-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: 0,
    });
    scene.anims.create({
        key: 'rogue_idle',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_idle-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: 0,
    });
    scene.anims.create({
        key: 'rogue_jump',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_jump-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: 0,
    });
    scene.anims.create({
        key: 'rogue_midair',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_jump_midair-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 10,
        repeat: 0,
    });
    scene.anims.create({
        key: 'rogue_shoot',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_shoot-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 15,
        repeat: 0,
    });
    scene.anims.create({
        key: 'rogue_melee',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_melee-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 15,
        repeat: 0,
    });
    scene.anims.create({
        key: 'rogue_dash',
        frames: scene.anims.generateFrameNames('rogue_player', {
            prefix: 'rogue_player_dash-',
            suffix: '.png',
            start: 0,
            end: 7,
        }),
        frameRate: 15,
        repeat: 0,
    });

    scene.anims.create({
      key: 'skeleton_archer_idle',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_idle-',
        suffix: '.png',
        start: 1,
        end: 7
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'skeleton_archer_attack_1',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_shoot1-',
        suffix: '.png',
        start: 1,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'skeleton_archer_attack_2',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_shoot2-',
        suffix: '.png',
        start: 0,
        end: 14
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'skeleton_archer_evasion',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_evasion-',
        suffix: '.png',
        start: 0,
        end: 5
      }),
      frameRate: 10,
      repeat: 0
    })

    scene.anims.create({
      key: 'skeleton_archer_hurt',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_hurt-',
        suffix: '.png',
        start: 0,
        end: 1
      }),
      frameRate: 10,
      repeat: 0
    })

    scene.anims.create({
      key: 'skeleton_archer_melee_1',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_melee1-',
        suffix: '.png',
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    })

    scene.anims.create({
      key: 'skeleton_archer_melee_2',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_melee2-',
        suffix: '.png',
        start: 0,
        end: 3
      }),
      frameRate: 6,
      repeat: -1,
      delay: 500,
      repeatDelay: 2000
    })

    scene.anims.create({
      key: 'skeleton_archer_melee_3',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_melee3-',
        suffix: '.png',
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'skeleton_archer_walk',
      frames: scene.anims.generateFrameNames('skeleton_archer', {
        prefix: 'skeleton_archer_walk-',
        suffix: '.png',
        start: 1,
        end: 8
      }),
      frameRate: 10,
      repeat: 0
    })




    scene.anims.create({
      key: 'darklord_walk',
      frames: scene.anims.generateFrameNames('darklord', {
        prefix: 'darklord_walk-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'darklord_idle',
      frames: scene.anims.generateFrameNames('darklord', {
        prefix: 'darklord_idle-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'darklord_attack',
      frames: scene.anims.generateFrameNames('darklord', {
        prefix: 'darklord_attack-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 6,
      repeat: -1
    })

    scene.anims.create({
      key: 'darklord_die',
      frames: scene.anims.generateFrameNames('darklord', {
        prefix: 'darklord_die-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 6,
      repeat: 0
    })

    scene.anims.create({
      key: 'brain_idle',
      frames: scene.anims.generateFrameNames('brain', {
        prefix: 'brain_idle-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'brain_attack',
      frames: scene.anims.generateFrameNames('brain', {
        prefix: 'brain_attack-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 6,
      repeat: -1
    })

    scene.anims.create({
      key: 'brain_die',
      frames: scene.anims.generateFrameNames('brain', {
        prefix: 'brain_die-',
        suffix: '.png',
        start: 0,
        end: 15
      }),
      frameRate: 6,
      repeat: 0
    })

  }