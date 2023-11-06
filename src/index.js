import Phaser from 'phaser';
import { MenuScene } from './start_menu';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MenuScene
}

const game = new Phaser.Game (config)
