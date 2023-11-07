import Phaser from 'phaser';
import { MenuScene } from './start_menu';
import { RyanLevel } from './Ryan_test_level';

window.sizeChanged = () => {
    if (game.isBooted) {
        setTimeout(() => {
            game.scale.resize(window.innerWidth, window.innerHeight);
            game.canvas.setAttribute(
                'style',
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
            );
        }, 100);
    }
};
window.onresize = () => window.sizeChanged();


const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: MenuScene
}

const game = new Phaser.Game (config)

