import Phaser from 'phaser';
import { RoguePlayer } from './classes/RoguePlayer.js';
import { Weather } from './classes/Weather.js';
import { Enemy } from './classes/Enemy.js';
import { handlePause } from './pauseHandler.js';
import { Actor } from './classes/Actor.js';

import tileset_img from './assets/tilesets/s4m_ur4i-metroidvania-1.3.png';
import tilemap from './assets/tilemaps/boss_testing.json';

import { ParaBackgrounds } from './classes/ParaBackgrounds.js';
import nebula from './assets/backgrounds/Nebula Blue.png'
import nebula2 from './assets/backgrounds/Nebula Red.png'
import small_stars from './assets/backgrounds/smallstars.png'
import big_stars from './assets/backgrounds/bigstars.png'

import executioner_img from './assets/animations/sprites/enemies/Executioner/executioner_atlas.png'
import executioner_atlas from './assets/animations/sprites/enemies/Executioner/executioner_atlas.json'

import rogue_image from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.png';
import rogue_atlas from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.json';

import loading_sprite from './assets/animations/sprites/enemies/Waifu/waifu_atlas.png'
import loading_atlas from './assets/animations/sprites/enemies/Waifu/waifu_atlas.json'

import laser_img from "./assets/particles/laser_2.png";

import flare from "./assets/particles/flare_1.png"
import dust from "./assets/particles/dust.png"

import { Executioner } from './classes/Executioner.js';

import poison_1 from "./assets/particles/poison1.png"
import sprite_explode from "./assets/particles/sprite_emitter.png"
import boss_explode from "./assets/particles/boss_death.png"
import exclaim1 from "./assets/particles/exclaim_1.png"
import exclaim2 from "./assets/particles/exclaim_2.png"
import exclaim3 from "./assets/particles/exclaim_3.png"

import { LoadingBar } from './LoadingBar.js';
import laser_sfx from './assets/shooting_sfx.wav';

export class BossTest extends Phaser.Scene {
    constructor() {
        super({
            key: 'BossLevel',
            title: 'Phaser game tutorial',
            type: Phaser.WEBGL,
            parent: 'game',
            backgroundColor: '#171717',
            scale: {
                mode: Phaser.Scale.ScaleModes.NONE,
                width: window.innerWidth,
                height: window.innerHeight,
            },
            render: {
                // antialiasGL: false,
                pixelArt: true,
            },
            callbacks: {
                postBoot: () => {
                    window.sizeChanged();
                },
            },
            canvasStyle: `display: block; width: 100%; height: 100%;`,
            autoFocus: true,
            audio: {
                disableWebAudio: false,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 },
                    debug: true,
                }
            },
            pack: {
                files: [
                    { type: 'atlas', key: 'rogue_load', textureURL: rogue_image, atlasURL: rogue_atlas },
                    { type: 'atlas', key: 'alt_load', textureURL: loading_sprite, atlasURL: loading_atlas }
                ]
            }
        });
        this.sfxArray = [];
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        this.weather = new Weather(this);
        this.backgrounds = new ParaBackgrounds(this, [
            { key: 'stars-small', image: small_stars },
            { key: 'stars-big', image: big_stars },
            { key: 'nebula', image: nebula },
            { key: 'nebula2', image: nebula2 },
        ])
        this.load.image("exclaim_1", exclaim1)
        this.load.image("exclaim_2", exclaim2)
        this.load.image("exclaim_3", exclaim3)

        this.load.image('flare', flare)
        this.load.image('laser', laser_img)
        this.load.image('dust', dust)

        this.load.image('poison_1', poison_1)
        this.load.image('boss_explode', boss_explode)
        this.load.image('sprite_explode', sprite_explode)

        this.load.image('standard_tiles', tileset_img);
        this.load.tilemapTiledJSON('tilemap2', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)
        this.load.atlas("executioner", executioner_img, executioner_atlas)

        // Load bar
        LoadingBar(this, true);

        this.load.audio('laser_sfx', laser_sfx);

    }
    create() {
        const sfxEnabled = localStorage.getItem('sfxEnabled') || 'true';
        
        const randomExclaim = Math.floor((Math.random() * 3));
        const { width, height } = this.scale;
        this.backgrounds.addBackground({
            ratioX: 0.1,
            sprite: this.add.tileSprite(0, 0, width, height, 'nebula2')
                .setOrigin(0, 0)
                .setScrollFactor(0, 0)
                // .setTint(0x001a33, 0x000d1a, 0x001a33)
                .setScale(1)
                .setDepth(-3)
        });

        this.backgrounds.addBackground({
            ratioX: 0.4,
            sprite: this.add.tileSprite(0, 0, width, height, 'stars-small')
                .setOrigin(0, 0)
                .setScrollFactor(0, 0)
                .setTint(0x003366, 0x004080)
                .setScale(1)
                .setDepth(-1)
        });

        this.backgrounds.addBackground({
            ratioX: 0.7,
            sprite: this.add.tileSprite(0, 0, width, height, 'stars-big')
                .setOrigin(0, 0)
                .setScrollFactor(0, 0)
                .setTint(0x003366, 0x004080)
                .setScale(1)
                .setDepth(-1)
        });

        this.boss_explode_emitter = this.add.particles(400, 250, 'boss_explode', {
            lifespan: 500,
            speed: { min: 200, max: 600 },
            scale: { start: 0.05, end: 0 },
            gravityY: 0,
            blendMode: 'LUMINOSITY',
            tint: 0xbabaf8,
            emitting: false
        });

        const map = this.make.tilemap({ key: 'tilemap2' })
        const tileset = map.addTilesetImage('boss_tiles', 'standard_tiles')

        this.background_tiles = map.createLayer('background platforms', tileset)

        this.ground2 = map.createLayer('ground2', tileset, 0, 0)
        this.ground2.setCollisionByExclusion(-1, true)

        this.player = new RoguePlayer(this, 123, 188, "rogue_player");
        this.cameras.main.startFollow(this.player);

        this.executioner = new Executioner(this, 360, 425, "executioner")
        // this.summon_test = new ExecutionerSummon(this, 150, 100, "executioner")

        this.laser_sfx = this.sound.add('laser_sfx');
        this.sfxArray.push(this.laser_sfx);

        this.sfxArray.forEach(sound => {
            if (sfxEnabled === 'true') {
                sound.setVolume(1.0);
            } else {
                sound.setMute(true);
            }

        });

        this.allSprites = this.children.list.filter(x => x instanceof Enemy)
        this.pauseHandler = handlePause(this, this.allSprites, this.sfxArray);

        this.player.init(this.ground2)

        this.dash_overlay = this.add.image(this.ground2.getCenter().x, 420, 'laser').setDepth(3)
        this.dash_overlay.angle = 90;
        this.dash_overlay.alpha = 0;
        this.dash_overlay.scaleY = 1.5;
        this.dash_overlay.scaleX = 1.5;
        this.dash_overlay.setTint(0x0B0B0B)

        const hudScenePlugin = this.scene.run('HUDScene')
        this.scene.bringToTop('HUDScene')
        // access scene
        this.hudScene = hudScenePlugin.get('HUDScene');

        const playerXInCamera = this.player.x
        const playerYInCamera = this.player.y

        this.bossHealthBar = this.add.graphics()
            .fillStyle(0xff0000)
            .fillRect(playerXInCamera - 220, playerYInCamera + 200, 420, 20);


    }

    update() {
        if (!this.fightStart) {
            if (!this.camereShakeStart) {
                this.cameras.main.shake(1000, 0.005)
                this.camereShakeStart = true;
            }
            if (!this.shownExclaim) {
                this.player.anims.play("rogue_idle")
                const randomExclaim = Math.floor((Math.random() * 3)) + 1;
                console.log(`exclaim_${randomExclaim}`)
                this.exclaim = this.add.image(this.player.x - this.player.getBody().width,
                    this.player.y - this.player.getBody().height,
                    `exclaim_${randomExclaim}`)
                this.exclaim.setScale(0.15)
                this.shownExclaim = true;
                this.time.delayedCall(2000, () => {
                    this.fightStart = true;
                    this.exclaim.destroy();
                })
            }
        } else {
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start(this.sceneToTransit)
            }, this.scene);

            if (this.player.getHP() <= 0) {
                this.physics.pause();
                this.children.list.forEach(x => {
                    if (x instanceof Actor) {
                        x.setActive(false);
                    }
                })
                localStorage.setItem('score', this.hudScene.score)
                this.hudScene.score = 0;
                this.scene.stop('HUDScene')
                if (!this.fadeOut) {
                    this.cameras.main.fadeOut(3000)
                    this.fadeOut = true;
                    this.sceneToTransit = "GameOverScene"
                }
            }

            this.player.update()
            this.backgrounds.update();
            this.hudScene.update()

            if (!this.executioner.getIsDead()) {
                this.bossHealthBar.clear()
                const healthPercentage = this.executioner.getHP() / this.executioner.maxHealth;
                const barWidth = 420 * healthPercentage;
                this.bossHealthBar = this.add.graphics()
                    .fillStyle(0xff0000)
                    .fillRect(this.player.x - 220, this.player.y + 200, barWidth, 20);
                this.executioner.update()
                this.executioner.summons.getChildren().forEach(x => {
                    if (x.getIsAlive()) x.update();
                })
            } else {
                // BOSS DEATH 
                this.poison.stop();
                this.dash_overlay.destroy();
                if (!this.shownDeath) {
                    this.boss_explode_emitter.setPosition(this.deathX, this.deathY)
                    this.boss_explode_emitter.explode(50);
                    this.shownDeath = true;
                    this.time.delayedCall(3000, () => {
                        // BOSS TRANSITION
                        localStorage.setItem('score', this.hudScene.score)
                        this.hudScene.score = 0;
                        this.scene.stop('HUDScene')
                        if (!this.fadeOut) {
                            this.sceneToTransit = "WinnerScene"
                            this.cameras.main.fadeOut(3000)
                            this.fadeOut = true;
                        }
                    })
                }
            }
        }
    }
}