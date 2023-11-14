import Phaser from 'phaser';
import { createAnimations } from './CreateAnimations.js';
import { handlePause } from './pauseHandler.js';
import { HUDScene } from './hud.js';

import { Actor } from './classes/Actor.js';
import { Enemy } from './classes/Enemy.js';
import { RoguePlayer } from './classes/RoguePlayer.js';
import { SkeletonArcher } from './classes/SkeletonArcher.js';
import { RogueDarkLord } from './classes/RogueDarkLord.js';
import { RogueBrain } from './classes/RogueBrain.js';

import { Weather } from './classes/Weather.js';

import tileset_img from './assets/tilesets/s4m_ur4i-metroidvania-1.3-high-contrast.png';
import tilemap from './assets/tilemaps/maxlevelvisualtrap.json';

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

import laser_img from "./assets/particles/laser_2.png";
import arrow_img from "./assets/animations/objects/arrow.png"

//backgrounds
import nebula from './assets/backgrounds/Nebula Blue.png'
import nebula2 from './assets/backgrounds/Nebula Red.png'
import small_stars from './assets/backgrounds/smallstars.png'
import big_stars from './assets/backgrounds/bigstars.png'
import nc1 from './assets/backgrounds/Layer1.png'
import nc2 from './assets/backgrounds/Layer2.png'
import nc3 from './assets/backgrounds/Layer3.png'
import nc4 from './assets/backgrounds/Layer4.png'
import nc5 from './assets/backgrounds/Layer5.png'
import { ParaBackgrounds } from './classes/ParaBackgrounds.js';

import flare from "./assets/particles/flare_1.png"
import dust from "./assets/particles/dust.png"
import { WinnerScene } from './winner.js';

import sceneMusic from './assets/levelMusic.wav';
import arrow_shoot_sfx from './assets/shooting_arrow.wav';

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

        this.backgrounds = new ParaBackgrounds(this,[
            {key: 'stars-small', image: small_stars},
            {key: 'stars-big', image: big_stars},
            {key: 'nebula', image: nebula},
            {key: 'nebula2', image: nebula2},
        ])

        this.load.image('metroid hc', tileset_img);
        this.load.tilemapTiledJSON('tilemap', tilemap);
        this.cameras.main.setZoom(2, 2);
        this.load.atlas("rogue_player", rogue_image, rogue_atlas)

        this.load.audio('sceneMusic', sceneMusic);
        this.load.audio('arrow_shoot_sfx', arrow_shoot_sfx);
    }
    create() {

        const musicEnabled = localStorage.getItem('musicEnabled');
		const sfxEnabled = localStorage.getItem('sfxEnabled');
		const weatherEnabled = localStorage.getItem('weatherEnabled');

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

        createAnimations(this);
        const map = this.make.tilemap({ key: 'tilemap' })
        const tileset = map.addTilesetImage('metroid hc')

        this.ground = map.createLayer('Collision', tileset).setDepth(3)

        this.bg2 = map.createLayer('bg2', tileset).setDepth(2);
        this.bg3 = map.createLayer('bg3', tileset).setDepth(1);
        this.background = map.createLayer('Background', tileset).setDepth(0);
        this.bg4 = map.createLayer('b4', tileset).setDepth(0);
        
        this.ground.setCollisionByExclusion(-1, true)
        this.player = new RoguePlayer(this, 10, 10, "rogue_player");
        this.physics.add.collider(this.player, this.ground);
        this.cameras.main.startFollow(this.player);

        // if (weatherEnabled === 'true') {
		// 	this.weather.setWindSpeed(-100);
		// 	this.weather.addRain();
		// 	this.weather.addFog();
		// }

        this.weather.setWindSpeed(-100);
        this.weather.addRain();
        this.weather.addFog();

        this.player.init(this.ground)

        this.hudScene = new HUDScene({ player: this.player });
        this.scene.bringToTop('HUDScene')
        this.scene.run('HUDScene')

		const sceneMusic = this.sound.add('sceneMusic');
		sceneMusic.loop = true;

		if (musicEnabled === 'true') {
			sceneMusic.play();
		}

		const arrow_shoot_sfx = this.sound.add('arrow_shoot_sfx');
		if (sfxEnabled === 'true') {
			arrow_shoot_sfx.setVolume(1.0);
		} else {
			arrow_shoot_sfx.setMute(true);
		}

        this.allSprites = this.children.list.filter(x => x instanceof RoguePlayer)

        this.pauseHandler = handlePause(this, sceneMusic, arrow_shoot_sfx);
        this.scene.manager.bringToTop('PauseMenuScene');

    }
    update() {
        this.weather.update();
        this.backgrounds.update();
        this.player.update(this.hudScene);
        this.hudScene.update();
        // console.log('Player Coordinates:', this.player.x, this.player.y);

        const targetX = 88;
        const targetY = 755

        const deathX = 766
        const deathY = 716

        const tolerance = 5; // Adjust this value based on your needs

        // if (
        //     this.player.x >= deathX - tolerance &&
        //     this.player.x <= deathX + tolerance &&
        //     this.player.y >= deathY - tolerance &&
        //     this.player.y <= deathY + tolerance
        // ) {
        //     console.log(this.player.getHP())
        //     this.player.setHP(0);
        // }

        // if (this.player.x <= deathX && this.player.y >= deathY) {
        //     console.log('death');
        //     this.player.setHP(100)
        // }


        if (this.player.getHP() === 0) {
            console.log(this.player.getHP())
            this.scene.start('GameOverScene')
        }

        if (this.player.x <= targetX && this.player.y >= targetY) {
            this.scene.stop('HUDScene')
            this.scene.start('WinnerScene');
        }
    }
}