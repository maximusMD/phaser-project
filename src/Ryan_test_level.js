import Phaser from 'phaser';
import { Actor } from './Actor';

import tileset_img from './assets/tilesets/s4m_ur4i_rogue-noir.png';
import tilemap from './assets/tilemaps/ryan_test.json';

import rogue_image from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.png';
import rogue_atlas from './assets/animations/sprites/player/Rogue_Player/rogue_player_atlas.json';

import skeleton_archer_image from './assets/animations/sprites/enemies/Skeleton_Archer/skeleton_archer_atlas.png';
import skeleton_archer_atlas from './assets/animations/sprites/enemies/Skeleton_Archer/skeleton_archer_atlas.json';

import { RoguePlayer } from './RoguePlayer.js';
import laser_img from './assets/animations/objects/laser_blue.png';

import play_image from './assets/controls/play_image.png';
import pause_image from './assets/controls/pause_image.png';

import { SkeletonArcher } from './SkeletonArcher.js';

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
				},
			},
		});

		//pause functionality
		this.isPaused = false;
		this.playImage = null;
		this.pauseImage = null;
		this.characters = [];
	}

	preload() {
		this.load.image('laser', laser_img);
		this.load.image('base_tiles', tileset_img);
		this.load.tilemapTiledJSON('tilemap', tilemap);
		this.cameras.main.setZoom(2, 2);
		this.load.atlas('rogue_player', rogue_image, rogue_atlas);

		this.load.atlas('skeleton_archer', skeleton_archer_image, skeleton_archer_atlas);

		//pause functionlity
		this.load.image('play', play_image);
		this.load.image('pause', pause_image);
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
		const map = this.make.tilemap({ key: 'tilemap' });
		const tileset = map.addTilesetImage('standard_tiles', 'base_tiles');

		const ground = map.createLayer('ground', tileset);
		ground.setCollisionByExclusion(-1, true);

		this.player = new RoguePlayer(this, 10, 10, 'rogue_player');
		this.physics.add.collider(this.player, ground);
		this.cameras.main.startFollow(this.player);

		this.enemy = new SkeletonArcher(this, 100, 10, 'skeleton_archer');
		this.physics.add.collider(this.enemy, ground);
		this.enemy2 = new SkeletonArcher(this, 275, 10, 'skeleton_archer');
		this.physics.add.collider(this.enemy2, ground);

		this.graphics = this.add.graphics();
		this.line = new Phaser.Geom.Line(
			this.enemy.getBody().x,
			this.enemy.getBody().y,
			this.player.getBody().x,
			this.player.getBody().y
		);
		this.line2 = new Phaser.Geom.Line(
			this.enemy2.getBody().x,
			this.enemy2.getBody().y,
			this.player.getBody().x,
			this.player.getBody().y
		);

		// CHANGE THIS TO ENEMIES WHEN DONE NOT ACTORS
		// MAYBE MOVE TO PLAYER CLASS? this.scene.children etc
		const allEnemies = this.children.list.filter((x) => x instanceof Actor);
		this.physics.add.overlap(this.player.laserGroup, allEnemies, this.handleOverlap);

		// pause functionality
		this.characters.push(this.player, this.enemy, this.enemy2);

		this.playImage = this.add.image(400, 200, 'play');
		this.playImage.setScrollFactor(0);
		this.playImage.setScale(0.025);

		this.pauseImage = this.add.image(400, 200, 'pause');
		this.pauseImage.setScrollFactor(0);
		this.pauseImage.setScale(0.015);
		this.pauseImage.setVisible(false);

		this.input.keyboard.on('keydown-ESC', () => {
			this.togglePause();
		});
	}

	update() {
		//pause functionality
		if (this.isPaused) {
			return;
		}

		this.player.update();
		this.enemy.update(this.player, this.graphics, this.line);
		this.enemy2.update(this.player, this.graphics, this.line2);

		//pause functionality
		this.playImage.setVisible(!this.isPaused);
		this.pauseImage.setVisible(this.isPaused);
	}

	//pause functionality
	togglePause() {
		this.isPaused = !this.isPaused;

		if (this.isPaused) {
			this.physics.pause();

			// Stop updating characters
			this.characters.forEach((character) => {
				character.setActive(false);
			});

			this.playImage.setVisible(false);
			this.pauseImage.setVisible(true);
		} else {
			this.physics.resume();

			this.characters.forEach((character) => {
				character.setActive(true);
			});
		}
	}
}
