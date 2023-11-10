import Phaser from 'phaser';
import { Enemy } from './classes/Enemy.js';
import { createAnimations } from './CreateAnimations.js';
import { handlePause } from './pauseHandler.js';
import { RoguePlayer } from './classes/RoguePlayer.js';
import { Actor } from './classes/Actor.js';
import { SkeletonArcher } from './classes/SkeletonArcher.js';
import { RogueDarkLord } from './classes/RogueDarkLord.js';
import { RogueBrain } from './classes/RogueBrain.js';
import { HUDScene } from './hud.js';

import tileset_img from './assets/tilesets/s4m_ur4i_rogue-noir.png';
import tilemap from './assets/tilemaps/ryan_test.json';

import rogue_image from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.png';
import rogue_atlas from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.json';

import skeleton_archer_image from './assets/animations/sprites/enemies/Skeleton_Archer/skeleton_archer_atlas.png';
import skeleton_archer_atlas from './assets/animations/sprites/enemies/Skeleton_Archer/skeleton_archer_atlas.json';


import sneaker_atlas from "./assets/animations/sprites/enemies/Rogue_Sneaker/sneaker_atlas.json"
import sneaker_image from "./assets/animations/sprites/enemies/Rogue_Sneaker/sneaker_atlas.png"

import darklord_atlas from './assets/animations/sprites/enemies/Rogue_Darklord/darklord_atlas.json'
import darklord_image from './assets/animations/sprites/enemies/Rogue_Darklord/darklord_atlas.png'

import brain_atlas from './assets/animations/sprites/enemies/Rogue_Brain/brain_atlas.json'
import brain_image from './assets/animations/sprites/enemies/Rogue_Brain/brain_atlas.png'

import laser_img from "./assets/animations/objects/laser_blue.png"
import { Weather } from './classes/Weather.js';

//backgrounds
import dungeon_middle from "./assets/backgrounds/middle_layer.png"
import dungeon_back from "./assets/backgrounds/back_layer.png"
import dungeon_sky from "./assets/backgrounds/sky_layer.png"

import sceneMusic from './assets/menuMusic.wav';

export class RyanLevel extends Phaser.Scene {
    #backGrounds = [];
    constructor() {
        super({
            key: 'RyanLevel',
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
            }
        });
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        this.weather = new Weather(this);
        this.load.image('dungeon_middle', dungeon_middle)
        this.load.image('dungeon_back', dungeon_back)
        this.load.image('sky', dungeon_sky)

        this.load.image('laser', laser_img)
        this.load.image('base_tiles', tileset_img);
        this.load.tilemapTiledJSON('tilemap', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)

        this.load.atlas("skeleton_archer", skeleton_archer_image, skeleton_archer_atlas)

        this.load.atlas('darklord', darklord_image, darklord_atlas)
        this.load.atlas('brain', brain_image, brain_atlas)

        this.load.audio('sceneMusic', sceneMusic);

    }

    // LASER HANDLER ON SPRITES
    handleOverlap(sprite, overlapSprite) {
        if (!overlapSprite.getHasHit()) {
            sprite.setHP(overlapSprite.getLaserDamage());
        }
        overlapSprite.setHasHit(true);
        overlapSprite.setVisible(false);

        // Reset needs a better more perm solution later
        overlapSprite.body.reset(-400, -400);

    }

    create() {
        const { width, height } = this.scale;
        this.add.image(0, 0, 'sky')
            .setScrollFactor(0);

        this.#backGrounds.push({
            ratioX: 0.1,
            sprite: this.add.tileSprite(0, 0, width, height, 'dungeon_back')
                .setOrigin(0, 0)
                .setScrollFactor(0, 0)
                .setTint(0x001a33, 0x000d1a, 0x001a33)
                .setScale(1)
                .setDepth(-3)
        });

        this.#backGrounds.push({
            ratioX: 0.4,
            sprite: this.add.tileSprite(0, 0, width, height, 'dungeon_middle')
                .setOrigin(0, 0)
                .setScrollFactor(0, 0)
                .setTint(0x003366, 0x004080)
                .setScale(1)
                .setDepth(-1)
        });

        this.scene.run('HUDScene')


        createAnimations(this);

        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('standard_tiles', 'base_tiles')

        const ground = map.createLayer('ground', tileset)
        ground.setCollisionByExclusion(-1, true)
        this.weather = new Weather(this);

        this.enemy = new SkeletonArcher(this, 100, 10, "skeleton_archer");
        this.physics.add.collider(this.enemy, ground);
        this.enemy2 = new SkeletonArcher(this, 275, 10, "skeleton_archer");
        this.physics.add.collider(this.enemy2, ground);

        this.enemy3 = new RogueDarkLord(this, 215, 10, 'darklord')
        this.physics.add.collider(this.enemy3, ground);
        this.enemy4 = new RogueDarkLord(this, 400, 10, 'darklord')
        this.physics.add.collider(this.enemy4, ground);

        this.enemy5 = new RogueBrain(this, 100, 200, 'brain')
        this.physics.add.collider(this.enemy5, ground);
        this.enemy6 = new RogueBrain(this, 300, 200, 'brain')
        this.physics.add.collider(this.enemy6, ground);

        // Keep this below all enemy creation
        this.allEnemies = this.children.list.filter(x => x instanceof Enemy);
        // Player needs to come after enemies as needs list of sprites currently for lasers
        this.player = new RoguePlayer(this, 10, 10, "rogue_player");
        this.physics.add.collider(this.player, ground);
        this.cameras.main.startFollow(this.player);

        this.physics.add.overlap(this.player.laserGroup, this.allEnemies, this.handleOverlap)

        this.graphics = this.add.graphics();
        this.line = new Phaser.Geom.Line(
            this.enemy.getBody().x,
            this.enemy.getBody().y,
            this.player.getBody().x,
            this.player.getBody().y
        )
        this.line2 = new Phaser.Geom.Line(
            this.enemy2.getBody().x,
            this.enemy2.getBody().y,
            this.player.getBody().x,
            this.player.getBody().y
        )

        this.line3 = new Phaser.Geom.Line(
            this.enemy3.getBody().x,
            this.enemy3.getBody().y,
            this.player.getBody().x,
            this.player.getBody().y
        )

        this.line4 = new Phaser.Geom.Line(
            this.enemy4.getBody().x,
            this.enemy4.getBody().y,
            this.player.getBody().x,
            this.player.getBody().y
        )

        this.line5 = new Phaser.Geom.Line(
            this.enemy5.getBody().x,
            this.enemy5.getBody().y,
            this.player.getBody().x,
            this.player.getBody().y
        )

        this.line6 = new Phaser.Geom.Line(
            this.enemy6.getBody().x,
            this.enemy6.getBody().y,
            this.player.getBody().x,
            this.player.getBody().y
        )

        const sceneMusic = this.sound.add('sceneMusic');
        if (!sceneMusic.isPlaying) {
            sceneMusic.play();
        }

        this.allSprites = this.children.list.filter(x => x instanceof Actor)
        this.pauseHandler = handlePause(this, this.allSprites, sceneMusic);
        this.weather.setWindSpeed(-5);
        this.weather.addFog();


    }

    update() {
        this.weather.update();

        for (const bg of this.#backGrounds) {
            bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX;
        }

        this.player.update();
        this.enemy.update(this.player, this.graphics, this.line);
        this.enemy2.update(this.player, this.graphics, this.line2);
        this.enemy3.update(this.player, this.graphics, this.line3)
        this.enemy4.update(this.player, this.graphics, this.line4)
        this.enemy5.update(this.player, this.graphics, this.line5)
        this.enemy6.update(this.player, this.graphics, this.line6)
    }

}
