import Phaser from 'phaser';
import { Preloader } from './Preloader';
import { MenuScene } from './start_menu';
import { OptionsScene } from './options_menu';
import { UserForm } from './UserForm';
import { RyanLevel } from './Ryan_test_level';
import { CreditsScene } from './credits';
import { PauseMenuScene } from './pause_menu';
import { AboutScene } from './about';
import { HUDScene } from './hud';
import { ControlsScene } from './controls';

window.sizeChanged = () => {
	if (game.isBooted) {
		setTimeout(() => {
			game.scale.resize(window.innerWidth, window.innerHeight);
			game.canvas.setAttribute(
				'style',
				`display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
			);
		}, 100);
	}
};
window.onresize = () => window.sizeChanged();

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Preloader, MenuScene, OptionsScene, ControlsScene, UserForm, RyanLevel, CreditsScene, AboutScene, HUDScene, PauseMenuScene],
    render: { pixelArt: true},
    dom: { createContainer: true}, 
}

const game = new Phaser.Game(config)
