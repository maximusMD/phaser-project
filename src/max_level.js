import Phaser from 'phaser';
import { Enemy } from './classes/Enemy.js';
import { createAnimations } from './CreateAnimations.js';
import { handlePause } from './pauseHandler.js';
import { RoguePlayer } from './classes/RoguePlayer.js';
import { Weather } from './classes/Weather.js';

import tileset_img from './assets/tilesets/s4m_ur4i-metroidvania-1.3-high-contrast.png';
import tilemap from './assets/tilemaps/maxlevel.json';

import rogue_image from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.png';
import rogue_atlas from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.json';
import laser_img from "./assets/particles/laser_2.png";

import flare from "./assets/particles/flare_1.png"
import dust from "./assets/particles/dust.png"

export class MaxLevel extends Phaser.Scene {
    constructor() {
        super({
            key: 'MaxLevel',
            title: 'Wavy',
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

        this.load.image('metroid hc', tileset_img, { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('tilemap', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)
    }
    create() {
        createAnimations(this);
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('metroid hc')

        this.background_tiles = map.createLayer('background_colour', tileset)

        this.ground = map.createLayer('Collision', tileset)

        this.bg2 = map.createLayer('bg2', tileset);
        this.bg3 = map.createLayer('bg3', tileset);
        this.background = map.createLayer('Background', tileset);
        this.bg4 = map.createLayer('b4', tileset);
        
        this.ground.setCollisionByExclusion(-1, true)

        map.createFromObjects('PITS')

        // objectLayer.objects.forEach((object) => {
        // const gid = object.gid;

        // const imageKey = map.tilesets[0].getTileProperties(gid);

        // const sprite = this.add.sprite(object.x, object.y, imageKey);
        // sprite.setOrigin(0, 1);
        // });

//         const objectLayer = map.getObjectLayer('PITS')
// // Iterate through the objects in the object layer
// objectLayer.objects.forEach((object) => {
//    const tileId = object.gid & 0x1FFFFFFF;

//    const tileProperties = map.tilesets[3].getTileProperties(tileId);

//    if (tileProperties) {
//        const sprite = this.add.sprite(object.x, object.y, tileset.image, tileId);
//        sprite.setOrigin(0, 1); // Adjust the origin as needed
//    } else {
//        console.warn('Object is missing tile properties:', object);
//    }
// });

        this.player = new RoguePlayer(this, 10, 10, "rogue_player");
        this.physics.add.collider(this.player, this.ground);
        this.cameras.main.startFollow(this.player);

        this.player.init(this.ground)

    }
    update() {
        this.player.update();
    }
}