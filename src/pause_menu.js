import pauseMenuImg from './assets/menu_buttons/pause-menu.png';
import musicImg from './assets/menu_buttons/music.png';
import sfxImg from './assets/menu_buttons/sfx.png';
import onImg from './assets/menu_buttons/on.png';
import offImg from './assets/menu_buttons/off.png';
import resumeMenuImg from './assets/menu_buttons/resume.png';
import pImg from './assets/controls/p.png';

export class PauseMenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'PauseMenuScene',
		});
	}

	init(data) {
		this.music = data.music;
		this.isMusicPlaying = data.isMusicPlaying;
	}

	preload() {
		this.load.image('pauseMenuBg', 'assets/bg.png');
		this.load.image('pauseMenuImg', pauseMenuImg);
		this.load.image('musicImg', musicImg);
		this.load.image('sfxImg', sfxImg);
		this.load.image('onImg', onImg);
		this.load.image('offImg', offImg);
		this.load.image('resumeMenuImg', resumeMenuImg);
		this.load.image('pImg', pImg);
	}

	create() {
		const centerX = this.cameras.main.width / 2;
		const centerY = this.cameras.main.height / 2;

		const pauseMenuBg = this.add.image(centerX, centerY + 0, 'pauseMenuBg');
		pauseMenuBg.setOrigin(0.5, 0.5);
		pauseMenuBg.setAlpha(0.7);
		pauseMenuBg.setScale(0.6);

		const pauseMenuImg = this.add.image(centerX, centerY - 200, 'pauseMenuImg');
		pauseMenuImg.setOrigin(0.5, 0.5);
		pauseMenuImg.setScale(2.0);

		const musicImg = this.add.image(centerX - 250, centerY - 120, 'musicImg');
		musicImg.setOrigin(0.5, 0.5);
		musicImg.setScale(1.5);

		const sfxImg = this.add.image(centerX - 280, centerY - 30, 'sfxImg');
		sfxImg.setOrigin(0.5, 0.5);
		sfxImg.setScale(1.5);

		const onImgMusic = this.add.image(centerX + 150, centerY - 120, 'onImg').setInteractive();
		onImgMusic.setOrigin(0.5, 0.5);
		onImgMusic.setScale(1.5);
		onImgMusic.setInteractive();

		const offImgMusic = this.add.image(centerX + 300, centerY - 120, 'offImg').setInteractive();
		offImgMusic.setOrigin(0.5, 0.5);
		offImgMusic.setScale(1.5);
		offImgMusic.setInteractive();

		onImgMusic.on('pointerdown', () => {
			this.music.setMute(false);
			this.isMusicPlaying = true;
		});

		offImgMusic.on('pointerdown', () => {
			this.music.setMute(true);
			this.isMusicPlaying = false;
		});

		const onImgSfx = this.add.image(centerX + 150, centerY - 30, 'onImg');
		onImgSfx.setOrigin(0.5, 0.5);
		onImgSfx.setScale(1.5);

		const offImgSfx = this.add.image(centerX + 300, centerY - 30, 'offImg');
		offImgSfx.setOrigin(0.5, 0.5);
		offImgSfx.setScale(1.5);

		const resumeMenuImg = this.add.image(centerX, centerY + 100, 'resumeMenuImg');
		resumeMenuImg.setOrigin(0.5, 0.5);
		resumeMenuImg.setScale(1.5);

		const pImg = this.add.image(centerX + 180, centerY + 100, 'pImg');
		pImg.setOrigin(0.5, 0.5);
		pImg.setScale(2.5);
	}
}
