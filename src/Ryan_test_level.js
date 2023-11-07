import Phaser from 'phaser';

import tileset_img from "./assets/tilesets/s4m_ur4i_rogue-noir.png"
import tilemap from "./assets/tilemaps/ryan_test.json"

import rogue_image from "./assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.png"
import rogue_atlas from "./assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.json"

import { RoguePlayer } from './RoguePlayer.js';
import laser_img from "./assets/animations/objects/laser_blue.png"

export class RyanLevel extends Phaser.Scene {
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
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                },
            },
            render: {
                antialiasGL: false,
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
        this.load.image('laser', laser_img)
        this.load.image('base_tiles', tileset_img);
        this.load.tilemapTiledJSON('tilemap', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)
        // this.laser_test = new Laser(this, 10, 10)
        // this.laser = new Phaser.GameObjects.Rectangle(this, 10,10, 0xff0000)
    }

    create() {

        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('standard_tiles', 'base_tiles')

        const ground = map.createLayer('ground', tileset)
        ground.setCollisionByExclusion(-1, true)

        this.player = new RoguePlayer(this, 10, 10, "rogue_player", "");
        this.physics.add.collider(this.player, ground);
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.player.update();
    }
}