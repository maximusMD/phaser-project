import Phaser from 'phaser'

import controlsImg from './assets/menu_buttons/controls.png'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import optImg from './assets/menu_buttons/options.png';

import aKey from './assets/controls/a.png'
import dKey from './assets/controls/d.png'
import kKey from './assets/controls/k.png'
import mKey from './assets/controls/m.png'
import pKey from './assets/controls/p.png'
import sKey from './assets/controls/s.png'
import shiftKey from './assets/controls/shift.png'
import spaceKey from './assets/controls/space.png'
import wKey from './assets/controls/w.png'

import up from './assets/controls/up.png'
import down from './assets/controls/down.png'
import left from './assets/controls/left.png'
import right from './assets/controls/right.png'
import melee from './assets/controls/melee.png'
import shoot from './assets/controls/shoot.png'
import dash from './assets/controls/dash.png'
import jump from './assets/controls/jump.png'
import pause from './assets/controls/pause.png'




export class ControlsScene extends Phaser.Scene {
    constructor () {
        super({ key: 'ControlsScene' })
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('cont-header', controlsImg)
        this.load.image('main-menu', mainMenuImg)
        this.load.image('options', optImg)

        this.load.image('a-key', aKey)
        this.load.image('d-key', dKey)
        this.load.image('k-key', kKey)
        this.load.image('m-key', mKey)
        this.load.image('p-key', pKey)
        this.load.image('s-key', sKey)
        this.load.image('shift-key', shiftKey)
        this.load.image('space-key', spaceKey)
        this.load.image('w-key', wKey)

        this.load.image('up', up)
        this.load.image('down', down)
        this.load.image('left', left)
        this.load.image('right', right)
        this.load.image('melee', melee)
        this.load.image('shoot', shoot)
        this.load.image('dash', dash)
        this.load.image('jump', jump)
        this.load.image('pause', pause)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const header = this.add.image(gameWidth * 0.54, gameHeight * 0.21, 'cont-header');
        const headerScaleFactor = gameWidth / header.width
        header.setScale(headerScaleFactor * 0.45);

        const options = this.addButton(gameWidth * 0.9, gameHeight * 0.1, 'options', () => {
            this.handleOptions();
        });
        const optionsScaleFactor = gameWidth / options.width; 
        options.setScale(optionsScaleFactor * 0.125)
        
        const mainMenu = this.addButton(gameWidth * 0.1, gameHeight * 0.1, 'main-menu', () => {
            this.handleMain()
        });
        const mainMenuScaleFactor = gameWidth / mainMenu.width; 
        mainMenu.setScale(mainMenuScaleFactor * 0.15)


        const wKey = this.add.image(gameWidth * 0.415, gameHeight * 0.41, 'w-key')
        const wKeyScaleFactor = gameWidth / wKey.width; 
        wKey.setScale(wKeyScaleFactor * 0.05)

        const up = this.add.image(gameWidth * 0.415, gameHeight * 0.335, 'up')
        const upScaleFactor = gameWidth / up.width; 
        up.setScale(upScaleFactor * 0.05)

        const aKey = this.add.image(gameWidth * 0.36, gameHeight * 0.51, 'a-key')
        const aKeyScaleFactor = gameWidth / aKey.width; 
        aKey.setScale(aKeyScaleFactor * 0.05)

        const left = this.add.image(gameWidth * 0.285, gameHeight * 0.51, 'left')
        const leftScaleFactor = gameWidth / left.width; 
        left.setScale(leftScaleFactor * 0.075)

        const sKey = this.add.image(gameWidth * 0.415, gameHeight * 0.51, 's-key')
        const sKeyScaleFactor = gameWidth / sKey.width; 
        sKey.setScale(sKeyScaleFactor * 0.05)

        const down = this.add.image(gameWidth * 0.415, gameHeight * 0.585, 'down')
        const downScaleFactor = gameWidth / down.width; 
        down.setScale(downScaleFactor * 0.075)

        const dKey = this.add.image(gameWidth * 0.47, gameHeight * 0.51, 'd-key')
        const dKeyScaleFactor = gameWidth / dKey.width; 
        dKey.setScale(dKeyScaleFactor * 0.05)

        const right = this.add.image(gameWidth * 0.545, gameHeight * 0.51, 'right')
        const rightScaleFactor = gameWidth / right.width; 
        right.setScale(rightScaleFactor * 0.075)

        const kKey = this.add.image(gameWidth * 0.65, gameHeight * 0.41, 'k-key')
        const kKeyScaleFactor = gameWidth / kKey.width; 
        kKey.setScale(kKeyScaleFactor * 0.05)

        const shoot = this.add.image(gameWidth * 0.75, gameHeight * 0.41, 'shoot')
        const shootScaleFactor = gameWidth / shoot.width; 
        shoot.setScale(shootScaleFactor * 0.08)

        const mKey = this.add.image(gameWidth * 0.65, gameHeight * 0.51, 'm-key')
        const mKeyScaleFactor = gameWidth / mKey.width; 
        mKey.setScale(mKeyScaleFactor * 0.05)

        const melee = this.add.image(gameWidth * 0.75, gameHeight * 0.51, 'melee')
        const meleeScaleFactor = gameWidth / melee.width; 
        melee.setScale(meleeScaleFactor * 0.08)

        const shiftKey = this.add.image(gameWidth * 0.335, gameHeight * 0.69, 'shift-key')
        const shiftKeyScaleFactor = gameWidth / shiftKey.width; 
        shiftKey.setScale(shiftKeyScaleFactor * 0.1)

        const dash = this.add.image(gameWidth * 0.45, gameHeight * 0.69, 'dash')
        const dashScaleFactor = gameWidth / dash.width; 
        dash.setScale(dashScaleFactor * 0.08)

        const spaceKey = this.add.image(gameWidth * 0.625, gameHeight * 0.69, 'space-key')
        const spaceKeyScaleFactor = gameWidth / spaceKey.width; 
        spaceKey.setScale(spaceKeyScaleFactor * 0.175)

        const jump = this.add.image(gameWidth * 0.775, gameHeight * 0.69, 'jump')
        const jumpScaleFactor = gameWidth / jump.width; 
        jump.setScale(jumpScaleFactor * 0.08)

        const pKey = this.add.image(gameWidth * 0.465, gameHeight * 0.865, 'p-key')
        const pKeyScaleFactor = gameWidth / pKey.width; 
        pKey.setScale(pKeyScaleFactor * 0.05)

        const pause = this.add.image(gameWidth * 0.55, gameHeight * 0.865, 'pause')
        const pauseScaleFactor = gameWidth / pause.width; 
        pause.setScale(pauseScaleFactor * 0.08)
    }

    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    handleOptions() {
        this.scene.start('OptionsScene')
    }

    handleMain() {
        this.scene.start('MenuScene')
    }
}