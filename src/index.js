import Phaser from 'phaser';
import { Preloader } from './Preloader';
import { MenuScene } from './start_menu';
import { UserForm } from './UserForm';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Preloader, MenuScene, UserForm],
    render: { pixelArt: true},
    dom: { createContainer: true}
}

const game = new Phaser.Game (config)