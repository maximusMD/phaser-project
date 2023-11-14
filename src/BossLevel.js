import Phaser from 'phaser';
import { RoguePlayer } from './classes/RoguePlayer.js';
import { Weather } from './classes/Weather.js';
import { Enemy } from './classes/Enemy.js';
import { handlePause } from './pauseHandler.js';

import tileset_img from './assets/tilesets/s4m_ur4i-metroidvania-1.3.png';
import tilemap from './assets/tilemaps/boss_testing.json';

import executioner_img from './assets/animations/sprites/enemies/Executioner/executioner_atlas.png'
import executioner_atlas from './assets/animations/sprites/enemies/Executioner/executioner_atlas.json'

import rogue_image from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.png';
import rogue_atlas from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.json';
import laser_img from "./assets/particles/laser_2.png";

import flare from "./assets/particles/flare_1.png"
import dust from "./assets/particles/dust.png"

import { Executioner } from './classes/Executioner.js';
import { ExecutionerSummon } from './classes/Executioner.js';

import poison_1 from "./assets/particles/poison1.png"
import poison_2 from "./assets/particles/poison2.png"
import poison_3 from "./assets/particles/poison3.png"

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
        this.load.image('flare', flare)
        this.load.image('laser', laser_img)
        this.load.image('dust', dust)

        this.load.image('poison_1', poison_1)
        this.load.image('poison_2', poison_2)
        this.load.image('poison_3', poison_3)

        this.load.image('standard_tiles', tileset_img);
        this.load.tilemapTiledJSON('tilemap', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)
        this.load.atlas("executioner", executioner_img, executioner_atlas)
    }
    create() {
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('boss_tiles', 'standard_tiles')

        this.background_tiles = map.createLayer('background_colour', tileset)

        this.ground = map.createLayer('ground', tileset, 0, 0)
        this.ground.setCollisionByExclusion(-1, true)

        this.player = new RoguePlayer(this, 250 , 420, "rogue_player");
        this.cameras.main.startFollow(this.player);

        this.executioner = new Executioner(this, 360, 425, "executioner")
        // this.summon_test = new ExecutionerSummon(this, 150, 100, "executioner")

        this.allSprites = this.children.list.filter(x => x instanceof Enemy)
        this.pauseHandler = handlePause(this, this.allSprites);

        this.player.init(this.ground)
        this.executioner.createPoison();
    }
    update() {
        this.player.update();
        this.executioner.update()
        // this.time.delayedCall(3000, () => { this.executioner.summonPoison() })
    }
}