import Phaser from 'phaser';
import { RoguePlayer } from './classes/RoguePlayer.js';
import { Weather } from './classes/Weather.js';
import { Enemy } from './classes/Enemy.js';
import { handlePause } from './pauseHandler.js';

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
import laser_img from "./assets/particles/laser_2.png";

import flare from "./assets/particles/flare_1.png"
import dust from "./assets/particles/dust.png"

import { Executioner } from './classes/Executioner.js';

import poison_1 from "./assets/particles/poison1.png"
import sprite_explode from "./assets/particles/sprite_emitter.png"

import loading from "./assets/animations/loading_walk.gif"

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
            }
        });
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

        this.load.image('flare', flare)
        this.load.image('laser', laser_img)
        this.load.image('dust', dust)

        this.load.image('poison_1', poison_1)
        this.load.image('sprite_explode', sprite_explode)

        this.load.image('standard_tiles', tileset_img);
        this.load.tilemapTiledJSON('tilemap2', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)
        this.load.atlas("executioner", executioner_img, executioner_atlas)

        // Load bar
        console.log(this.cameras.main.displayHeight)
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        var barHeight = this.cameras.main.displayHeight / 2
        var barWidth = this.cameras.main.displayWidth / 2
        progressBox.fillRect(this.cameras.main.width / 2, this.cameras.main.height / 2, 320, 50);
        progressBox.setOrigin(0.5, 0.5)
        progressBar.set
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(barWidth, barHeight, 300 * value, 30);
            progressBar.setOrigin(0.5,0.5)
        });

        this.load.on('fileprogress', function (file) {
            // console.log(file.src);
        });
        this.load.on('complete', function () {
            // console.log('complete');
        });
    }
    create() {
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

        const map = this.make.tilemap({ key: 'tilemap2' })
        const tileset = map.addTilesetImage('boss_tiles', 'standard_tiles')

        this.background_tiles = map.createLayer('background platforms', tileset)

        this.ground2 = map.createLayer('ground2', tileset, 0, 0)
        this.ground2.setCollisionByExclusion(-1, true)

        this.player = new RoguePlayer(this, 250, 420, "rogue_player");
        this.cameras.main.startFollow(this.player);

        this.executioner = new Executioner(this, 360, 425, "executioner")
        // this.summon_test = new ExecutionerSummon(this, 150, 100, "executioner")

        this.allSprites = this.children.list.filter(x => x instanceof Enemy)
        this.pauseHandler = handlePause(this, this.allSprites);

        this.player.init(this.ground2)

        this.dash_overlay = this.add.image(this.ground2.getCenter().x, 420, 'laser').setDepth(3)
        this.dash_overlay.angle = 90;
        this.dash_overlay.alpha = 0;
        this.dash_overlay.scaleY = 1.5;
        this.dash_overlay.scaleX = 1.5;
        this.dash_overlay.setTint(0x0B0B0B)

    }
    update() {
        this.player.update();
        this.backgrounds.update();

        if (!this.executioner.getIsDead()) {
            this.executioner.update()
            this.executioner.summons.getChildren().forEach(x => {
                if (x.getIsAlive()) x.update();
            })
        }
    }
}