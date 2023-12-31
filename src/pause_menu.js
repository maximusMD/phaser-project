import pauseMenuImg from './assets/menu_buttons/pause-menu.png';
import musicImg from './assets/menu_buttons/music.png';
import sfxImg from './assets/menu_buttons/sfx.png';
import onImg from './assets/menu_buttons/on.png';
import offImg from './assets/menu_buttons/off.png';
import resumeMenuImg from './assets/menu_buttons/resume.png';
import pImg from './assets/controls/p.png';
import weatherImg from './assets/menu_buttons/weather.png';
import mainMenuImg from './assets/menu_buttons/main-menu.png';

export class PauseMenuScene extends Phaser.Scene {
	#weatherFlag;
	#sfxFlag;
	#musicFlag;
	constructor() {
		super({
			key: 'PauseMenuScene',
		});
	}

	init(data) {
		this.music = data.music;
		this.weather = data.weather;
		this.sfx = data.sfx;
	}

	preload() {
		this.load.image('pauseMenuImg', pauseMenuImg);
		this.load.image('musicImg', musicImg);
		this.load.image('sfxImg', sfxImg);
		this.load.image('onImg', onImg);
		this.load.image('offImg', offImg);
		this.load.image('resumeMenuImg', resumeMenuImg);
		this.load.image('pImg', pImg);
		this.load.image('weatherImg', weatherImg);
		this.load.image('mainMenuImg', mainMenuImg);
	}

	create() {
		const centerX = this.cameras.main.width / 2;
		const centerY = this.cameras.main.height / 2;

		//bg gradient
		const gradientBackground = this.add.graphics();
		gradientBackground.fillStyle(0x000000, 0.7);
		gradientBackground.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

		// pause menu img
		const pauseMenuImg = this.add.image(centerX, centerY - 200, 'pauseMenuImg');
		pauseMenuImg.setOrigin(0.5, 0.5);
		pauseMenuImg.setScale(2.0);

		// music img
		const musicImg = this.add.image(centerX - 250, centerY - 120, 'musicImg');
		musicImg.setOrigin(0.5, 0.5);
		musicImg.setScale(1.5);

		const onImgMusic = this.add.image(centerX + 150, centerY - 120, 'onImg').setInteractive();
		onImgMusic.setOrigin(0.5, 0.5);
		onImgMusic.setScale(1.5);

		const offImgMusic = this.add.image(centerX + 300, centerY - 120, 'offImg').setInteractive();
		offImgMusic.setOrigin(0.5, 0.5);
		offImgMusic.setScale(1.5);

		if (this.#musicFlag === null || this.#musicFlag === undefined) {
			this.#musicFlag = localStorage.getItem('musicEnabled');
		}
		
		onImgMusic.setTint(this.#musicFlag ? 0x808080 : 0xffffff);
		offImgMusic.setTint(this.#musicFlag ? 0xffffff : 0x808080);

		onImgMusic.on('pointerdown', () => {
			onImgMusic.setTint(0xffffff);
			offImgMusic.setTint(0x808080);
			this.toggleMusic(false);
		});

		offImgMusic.on('pointerdown', () => {
			onImgMusic.setTint(0x808080);
			offImgMusic.setTint(0xffffff);
			this.toggleMusic(true);
		});

		// sfx music
		const sfxImg = this.add.image(centerX - 280, centerY - 30, 'sfxImg');
		sfxImg.setOrigin(0.5, 0.5);
		sfxImg.setScale(1.5);

		const onImgSfx = this.add.image(centerX + 150, centerY - 30, 'onImg').setInteractive();
		onImgSfx.setOrigin(0.5, 0.5);
		onImgSfx.setScale(1.5);

		const offImgSfx = this.add.image(centerX + 300, centerY - 30, 'offImg').setInteractive();
		offImgSfx.setOrigin(0.5, 0.5);
		offImgSfx.setScale(1.5);

		if (this.#sfxFlag === null || this.#sfxFlag === undefined) {
			this.#sfxFlag = localStorage.getItem('sfxEnabled');
		}

		onImgSfx.setTint(this.#sfxFlag ? 0x808080 : 0xffffff);
		offImgSfx.setTint(this.#sfxFlag ? 0xffffff : 0x808080);

		onImgSfx.on('pointerdown', () => {
			this.toggleSFX(false);
			onImgSfx.setTint(0xffffff);
			offImgSfx.setTint(0x808080);
		});

		offImgSfx.on('pointerdown', () => {
			this.toggleSFX(true);
			onImgSfx.setTint(0x808080);
			offImgSfx.setTint(0xffffff);
		});

		// weather img
		const weatherImg1 = this.add.image(centerX - 200, centerY + 60, 'weatherImg');
		weatherImg1.setOrigin(0.5, 0.5);
		weatherImg1.setScale(1.5);

		const onWeatherImg = this.add.image(centerX + 150, centerY + 60, 'onImg').setInteractive();
		onWeatherImg.setOrigin(0.5, 0.5);
		onWeatherImg.setScale(1.5);

		const offWeatherImg = this.add
			.image(centerX + 300, centerY + 60, 'offImg')
			.setInteractive();
		offWeatherImg.setOrigin(0.5, 0.5);
		offWeatherImg.setScale(1.5);


		if (this.#weatherFlag === null || this.#weatherFlag === undefined) {
			this.#weatherFlag = localStorage.getItem('weatherEnabled');
		}

		onWeatherImg.setTint(this.#weatherFlag ? 0x808080 : 0xffffff);
		offWeatherImg.setTint(this.#weatherFlag ? 0xffffff : 0x808080);

		onWeatherImg.on('pointerdown', () => {
			onWeatherImg.setTint(0xffffff);
			offWeatherImg.setTint(0x808080);
			this.toggleWeather(false);
		});

		offWeatherImg.on('pointerdown', () => {
			onWeatherImg.setTint(0x808080);
			offWeatherImg.setTint(0xffffff);
			this.toggleWeather(true);
		});

		// resume image
		const resumeMenuImg = this.add.image(centerX, centerY + 150, 'resumeMenuImg');
		resumeMenuImg.setOrigin(0.5, 0.5);
		resumeMenuImg.setScale(1.5);

		const pImg = this.add.image(centerX + 180, centerY + 150, 'pImg');
		pImg.setOrigin(0.5, 0.5);
		pImg.setScale(2.5);

		// main menu image
		const mainMenuImg1 = this.add
			.image(centerX + 35, centerY + 230, 'mainMenuImg')
			.setInteractive();
		mainMenuImg1.setOrigin(0.5, 0.5);
		mainMenuImg1.setScale(1.5);

		mainMenuImg1.on('pointerdown', () => {
			this.handleMainMenu();
		});
	}

	toggleWeather(weather) {
		this.#weatherFlag = weather;
		if (weather) {
			this.weather.disable();
		} else {
			this.weather.enable();
		}
	}

	toggleMusic(mute) {
		this.#musicFlag = mute;
		if (mute) {
			this.music.stop();
		} else {
			this.music.play();
		}
	}

	toggleSFX(mute) {
		this.#sfxFlag = mute;
		this.sfx.forEach(sound => {
			sound.setMute(mute);
		});
	}

	handleMainMenu() {
		this.music.stop();
		const scenesToStop = [
			'Preloader',
			'MenuScene',
			'OptionsScene',
			'ControlsScene',
			'UserForm',
			'RyanLevel',
			'CreditsScene',
			'AboutScene',
			'HUDScene',
			'PauseMenuScene',
			'LeaderboardScene',
			'MaxLevel',
		];
		scenesToStop.forEach((sceneKey) => {
			this.scene.stop(sceneKey);
		});
		this.scene.start('MenuScene');
	}
}
