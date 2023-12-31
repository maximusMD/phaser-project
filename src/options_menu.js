import Phaser from 'phaser';
import optImg from './assets/menu_buttons/options.png';
import logoutImg from './assets/menu_buttons/logout.png';
import sfxImg from './assets/menu_buttons/sfx.png';
import musicImg from './assets/menu_buttons/music.png';
import weatherImg from './assets/menu_buttons/weather.png';
import zoomImg from './assets/menu_buttons/zoom.png';
import controlsImg from './assets/menu_buttons/controls.png';
import mainMenuImg from './assets/menu_buttons/main-menu.png';
import shareImg from './assets/menu_buttons/share.png';
import credImg from './assets/menu_buttons/credits.png';
import onImg from './assets/menu_buttons/on.png';
import offImg from './assets/menu_buttons/off.png';

import sceneMusic from './assets/levelMusic.wav';

export class OptionsScene extends Phaser.Scene {
	constructor() {
		super({ key: 'OptionsScene' });
	}

	preload() {
		this.load.image('background', 'assets/bg.png');
		this.load.image('header', optImg);
		this.load.image('weather', weatherImg);
		this.load.image('music', musicImg);
		this.load.image('sfx', sfxImg);
		this.load.image('zoom', zoomImg);
		this.load.image('controls', controlsImg);
		this.load.image('logout', logoutImg);
		this.load.image('credits', credImg);
		this.load.image('share', shareImg);
		this.load.image('main-menu', mainMenuImg);
		this.load.image('onImg', onImg);
		this.load.image('offImg', offImg);
		this.load.audio('sceneMusic', sceneMusic);
	}

	create() {
		const gameWidth = this.cameras.main.width;
		const gameHeight = this.cameras.main.height;

		// Set default values only if they are not present in localStorage
		// if (localStorage.getItem('weatherEnabled') === null) {
		// 	localStorage.setItem('weatherEnabled', 'true');
		// }

		// if (localStorage.getItem('musicEnabled') === null) {
		// 	localStorage.setItem('musicEnabled', 'true');
		// }

		// if (localStorage.getItem('sfxEnabled') === null) {
		// 	localStorage.setItem('sfxEnabled', 'true');
		// }

		const background = this.add.image(0, 0, 'background');
		background.displayWidth = gameWidth;
		background.displayHeight = gameHeight;
		background.setPosition(gameWidth / 2, gameHeight / 2);

		const header = this.add.image(gameWidth * 0.52, gameHeight * 0.25, 'header');
		const headerScaleFactor = gameWidth / header.width;
		header.setScale(headerScaleFactor * 0.55);

		const weather = this.add.image(gameWidth * 0.38, gameHeight * 0.42, 'weather');
		const weatherScaleFactor = gameWidth / weather.width;
		weather.setScale(weatherScaleFactor * 0.1635);

		const onWeatherImg = this.add
			.image(gameWidth * 0.63, gameHeight * 0.42, 'onImg')
			.setInteractive();
		onWeatherImg.setScale(weatherScaleFactor * 0.1635);

		const offWeatherImg = this.add
			.image(gameWidth * 0.71, gameHeight * 0.42, 'offImg')
			.setInteractive();
		offWeatherImg.setScale(weatherScaleFactor * 0.1635);

		onWeatherImg.on('pointerdown', () => {
			onWeatherImg.setTint(0xffffff);
			offWeatherImg.setTint(0x808080);
			localStorage.setItem('weatherEnabled', 'true');
		});

		offWeatherImg.on('pointerdown', () => {
			onWeatherImg.setTint(0x808080);
			offWeatherImg.setTint(0xffffff);
			localStorage.setItem('weatherEnabled', 'false');
		});

		const weatherEnabled = localStorage.getItem('weatherEnabled') || 'true';
		onWeatherImg.setTint(weatherEnabled === 'true' ? 0xffffff : 0x808080);
		offWeatherImg.setTint(weatherEnabled === 'true' ? 0x808080 : 0xffffff);

		const music = this.add.image(gameWidth * 0.38, gameHeight * 0.5, 'music');
		const musicScaleFactor = gameWidth / music.width;
		music.setScale(musicScaleFactor * 0.12);

		const onMusicImg = this.add
			.image(gameWidth * 0.63, gameHeight * 0.5, 'onImg')
			.setInteractive();
		onMusicImg.setScale(musicScaleFactor * 0.12);

		const offMusicImg = this.add
			.image(gameWidth * 0.71, gameHeight * 0.5, 'offImg')
			.setInteractive();
		offMusicImg.setScale(musicScaleFactor * 0.12);

		onMusicImg.on('pointerdown', () => {
			onMusicImg.setTint(0xffffff);
			offMusicImg.setTint(0x808080);
			localStorage.setItem('musicEnabled', 'true');
		});

		offMusicImg.on('pointerdown', () => {
			onMusicImg.setTint(0x808080);
			offMusicImg.setTint(0xffffff);
			localStorage.setItem('musicEnabled', 'false');
		});

		const musicEnabled = localStorage.getItem('musicEnabled') || 'true';
		onMusicImg.setTint(musicEnabled === 'true' ? 0xffffff : 0x808080);
		offMusicImg.setTint(musicEnabled === 'true' ? 0x808080 : 0xffffff);

		const sfx = this.add.image(gameWidth * 0.38, gameHeight * 0.59, 'sfx');
		const sfxScaleFactor = gameWidth / sfx.width;
		sfx.setScale(sfxScaleFactor * 0.08);

		const onSfxImg = this.add
			.image(gameWidth * 0.63, gameHeight * 0.59, 'onImg')
			.setInteractive();
		onSfxImg.setScale(sfxScaleFactor * 0.08);

		const offSfxImg = this.add
			.image(gameWidth * 0.71, gameHeight * 0.59, 'offImg')
			.setInteractive();
		offSfxImg.setScale(sfxScaleFactor * 0.08);

		onSfxImg.on('pointerdown', () => {
			onSfxImg.setTint(0xffffff);
			offSfxImg.setTint(0x808080);
			localStorage.setItem('sfxEnabled', 'true');
		});

		offSfxImg.on('pointerdown', () => {
			onSfxImg.setTint(0x808080);
			offSfxImg.setTint(0xffffff);
			localStorage.setItem('sfxEnabled', 'false');
		});

		const sfxEnabled = localStorage.getItem('sfxEnabled') || 'true';
		onSfxImg.setTint(sfxEnabled === 'true' ? 0xffffff : 0x808080);
		offSfxImg.setTint(sfxEnabled === 'true' ? 0x808080 : 0xffffff);

		// const zoom = this.add.image(gameWidth * 0.325, gameHeight * 0.65, 'zoom');
		// const zoomScaleFactor = gameWidth / zoom.width;
		// zoom.setScale(zoomScaleFactor * 0.11);

		const controls = this.addButton(gameWidth * 0.517, gameHeight * 0.75, 'controls', () => {
			this.handleControls();
		});
		const controlsScaleFactor = gameWidth / controls.width;
		controls.setScale(controlsScaleFactor * 0.21);

		const isLoggedIn = localStorage.getItem('loggedIn')

		if(isLoggedIn){
			const logout = this.addButton(gameWidth * 0.517, gameHeight * 0.865, 'logout', () => {
				localStorage.clear();
				this.scene.restart();
			});
			const logoutScaleFactor = gameWidth / logout.width;
			logout.setScale(logoutScaleFactor * 0.19);
		}

		const credits = this.addButton(gameWidth * 0.1, gameHeight * 0.9, 'credits', () => {
			this.handleCredits();
		});
		const creditsScaleFactor = gameWidth / credits.width;
		credits.setScale(creditsScaleFactor * 0.1835);

		const share = this.addButton(gameWidth * 0.915, gameHeight * 0.9, 'share', () => {
			const currentURL = window.location.href;
			this.copyToClipboard(currentURL);
			alert('URL copied to clipboard: ' + currentURL)
		});
		const shareScaleFactor = gameWidth / share.width;
		share.setScale(shareScaleFactor * 0.16);

		const mainMenu = this.addButton(gameWidth * 0.9, gameHeight * 0.1, 'main-menu', () => {
			this.handleMain();
		});
		const mainMenuScaleFactor = gameWidth / mainMenu.width;
		mainMenu.setScale(mainMenuScaleFactor * 0.1835);
	}

	addButton(x, y, key, onClick) {
		const button = this.add.image(x, y, key);
		button.setInteractive();
		button.on('pointerdown', onClick);
		return button;
	}

	openCred() {
		const credLink = 'https://www.youtube.com/watch?v=YXIHXQjbtl8';
		window.open(credLink, '_blank');
	}

	handleControls() {
		this.scene.start('ControlsScene');
	}

	handleCredits() {
		this.scene.start('CreditsScene');
	}

	handleMain() {
		this.scene.start('MenuScene');
	}

	copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}
