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
import { LeaderboardScene } from './leaderboard';
import { MaxLevel } from './max_level';
import { WinnerScene } from './winner';
import { GameOverScene } from './game_over';
import { BossTest } from './BossLevel';
import { LoadingScene } from './loading_screen';

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

localStorage.clear();

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Preloader, MenuScene, OptionsScene, ControlsScene, UserForm, RyanLevel, CreditsScene, AboutScene, HUDScene, PauseMenuScene, LeaderboardScene, MaxLevel, WinnerScene, GameOverScene, BossTest, LoadingScene],

	render: { pixelArt: true},
    dom: { createContainer: true}, 
}

const game = new Phaser.Game(config)
window.game = game;
