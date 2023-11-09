export class PauseMenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'PauseMenuScene',
		});
	}

	create() {
		const gameWidth = this.cameras.main.width;
		const gameHeight = this.cameras.main.height;
		const centerX = gameWidth / 2;
		const centerY = gameHeight / 2;

		const boxWidth = 200; 
		const boxHeight = 150;


		const menuBox = this.add.graphics();
		menuBox.fillStyle(0xffffff, 1);
		menuBox.fillRect(centerX - boxWidth / 2, centerY - boxHeight / 2, boxWidth, boxHeight);

		menuBox.setScrollFactor(0);


		this.add.text(centerX - 50, centerY - 50, 'Pause Menu', { fontSize: '16px', fill: '#000' });
	}
}
