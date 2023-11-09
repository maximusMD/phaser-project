import pauseMenuImg from './assets/menu_buttons/pause-menu.png';
import musicImg from './assets/menu_buttons/music.png';
import sfxImg from './assets/menu_buttons/sfx.png';
import onImg from './assets/menu_buttons/on.png';
import offImg from './assets/menu_buttons/off.png';
import resumeImg from './assets/menu_buttons/resume.png';

export class PauseMenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'PauseMenuScene',
		});
	}

	preload() {
		this.load.image('pauseMenuBg', 'assets/bg.png');
		this.load.image('pauseMenuImg', pauseMenuImg);
		this.load.image('musicImg', musicImg);
		this.load.image('sfxImg', sfxImg);
		this.load.image('onImg', onImg);
		this.load.image('offImg', offImg);
		this.load.image('resumeImg', resumeImg);
	}

	create() {
		const gameWidth = this.cameras.main.width;
		const gameHeight = this.cameras.main.height;
		const centerX = gameWidth / 2;
		const centerY = gameHeight / 2;

		const pauseMenuBg = this.add.image(centerX, centerY, 'pauseMenuBg');
		pauseMenuBg.setOrigin(0.5, 0.5);
		pauseMenuBg.setAlpha(0.7);
		pauseMenuBg.setScale(0.6);

		const pauseMenuImg = this.add.image(centerX, centerY/2 - 50, 'pauseMenuImg');
		pauseMenuImg.setOrigin(0.5, 0.5);
		pauseMenuImg.setScale(2.0);

		const musicImg = this.add.image(centerX -250, centerY/2 +50, 'musicImg');
		musicImg.setOrigin(0.5, 0.5);
		musicImg.setScale(1.5);

		const sfxImg = this.add.image(centerX -280, centerY/2 +150, 'sfxImg');
		sfxImg.setOrigin(0.5, 0.5);
		sfxImg.setScale(1.5);

		const onImgMusic = this.add.image(centerX +150, centerY/2 +50, 'onImg');
		onImgMusic.setOrigin(0.5, 0.5);
		onImgMusic.setScale(1.5);

		const offImgMusic = this.add.image(centerX +300, centerY/2 +50, 'offImg');
		offImgMusic.setOrigin(0.5, 0.5);
		offImgMusic.setScale(1.5);

		const onImgSfx = this.add.image(centerX +150,  centerY/2 +150, 'onImg');
		onImgSfx.setOrigin(0.5, 0.5);
		onImgSfx.setScale(1.5);

		const offImgSfx = this.add.image(centerX +300, centerY/2 +150, 'offImg');
		offImgSfx.setOrigin(0.5, 0.5);
		offImgSfx.setScale(1.5);
	}
}
