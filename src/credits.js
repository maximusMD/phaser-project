import Phaser from 'phaser'
import credBg from './assets/credits/synth2-bg.png'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import shareImg from './assets/menu_buttons/share.png'
import credImg from './assets/menu_buttons/credits.png'
import dom from './assets/credits/dom.png'
import mad from './assets/credits/mad.png'
import marius from './assets/credits/marius.png'
import max from './assets/credits/max.png'
import maximus from './assets/credits/maximus.png'
import rak from './assets/credits/rak.png'
import ryan from './assets/credits/ryan.png'
import sweepas from './assets/credits/sweepas.png'
import yas from './assets/credits/yas.png'
import yasar from './assets/credits/yasar.png'

export  class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene')
    }

    preload() {
        this.load.image('cred-background', credBg)
        this.load.image('share', shareImg)
        this.load.image('main-menu', mainMenuImg)
        this.load.image('cred-header', credImg)

        this.load.image('max', max)
        this.load.image('maximus', maximus)
        this.load.image('rak', rak)
        this.load.image('mad', mad)
        this.load.image('ryan', ryan)
        this.load.image('dom', dom)
        this.load.image('marius', marius)
        this.load.image('sweepas', sweepas)
        this.load.image('yas', yas)
        this.load.image('yasar', yasar)
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;


        const background = this.add.image(0, 0, 'cred-background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const header = this.add.image(gameWidth * 0.5, gameHeight * 0.11, 'cred-header');
        const headerScaleFactor = gameWidth / header.width
        header.setScale(headerScaleFactor * 0.4);

        const share = this.addButton(gameWidth * 0.915, gameHeight * 0.05, 'share', () => {
            const currentURL = window.location.href;
            this.copyToClipboard(currentURL);
            alert('URL copied to clipboard: ' + currentURL)
        });
        const shareScaleFactor = gameWidth / share.width; 
        share.setScale(shareScaleFactor * 0.16)
    
        const mainMenu = this.addButton(gameWidth * 0.1, gameHeight * 0.05, 'main-menu', () => {
            this.handleMain()
        });
        const mainMenuScaleFactor = gameWidth / mainMenu.width; 
        mainMenu.setScale(mainMenuScaleFactor * 0.1835)

        const max = this.addButton(gameWidth * 0.35, gameHeight * 0.475, 'max', () => {
            this.openLink('https://www.linkedin.com/in/maximiliandunne/')
        });
        const maxScaleFactor = gameWidth / max.width; 
        max.setScale(maxScaleFactor * 0.1835)

        const maximus = this.addButton(gameWidth * 0.6, gameHeight * 0.475, 'maximus', () => {
            this.openLink('https://github.com/maximusMD/')
        });
        const maximusScaleFactor = gameWidth / maximus.width; 
        maximus.setScale(maximusScaleFactor * 0.1835)

        const rak = this.addButton(gameWidth * 0.35, gameHeight * 0.575, 'rak', () => {
            this.openLink('https://www.linkedin.com/in/rakibsiddique/')
        });
        const rakScaleFactor = gameWidth / rak.width; 
        rak.setScale(rakScaleFactor * 0.1835)

        const mad = this.addButton(gameWidth * 0.6, gameHeight * 0.575, 'mad', () => {
            this.openLink('https://github.com/madraks/')
        });
        const madScaleFactor = gameWidth / mad.width; 
        mad.setScale(madScaleFactor * 0.1835)

        const ryan = this.addButton(gameWidth * 0.35, gameHeight * 0.675, 'ryan', () => {
            this.openLink('')
        });
        const ryanScaleFactor = gameWidth / ryan.width; 
        ryan.setScale(ryanScaleFactor * 0.1835)

        const dom = this.addButton(gameWidth * 0.6, gameHeight * 0.675, 'dom', () => {
            this.openLink('https://github.com/domaeos/')
        });
        const domScaleFactor = gameWidth / dom.width; 
        dom.setScale(domScaleFactor * 0.1835) 

        const marius = this.addButton(gameWidth * 0.35, gameHeight * 0.775, 'marius', () => {
            this.openLink('https://www.linkedin.com/in/marius-slepetys/')
        });
        const mariusScaleFactor = gameWidth / marius.width; 
        marius.setScale(mariusScaleFactor * 0.1835)

        const sweepas = this.addButton(gameWidth * 0.6, gameHeight * 0.775, 'sweepas', () => {
            this.openLink('https://github.com/sweepas/')
        });
        const sweepasScaleFactor = gameWidth / sweepas.width; 
        sweepas.setScale(sweepasScaleFactor * 0.1835)

        const yas = this.addButton(gameWidth * 0.35, gameHeight * 0.875, 'yas', () => {
            this.openLink('https://www.linkedin.com/in/yasar-osman-323a78b8/')
        });
        const yasScaleFactor = gameWidth / yas.width; 
        yas.setScale(yasScaleFactor * 0.1835)
        
        const yasar = this.addButton(gameWidth * 0.6, gameHeight * 0.875, 'yasar', () => {
            this.openLink('https://github.com/yasarosmankhan/')
        });
        const yasarScaleFactor = gameWidth / yasar.width; 
        yasar.setScale(yasarScaleFactor * 0.1835) 
    }

    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    openLink(link) {
        window.open(link, '_blank')
    }

    handleMain() {
        this.scene.start('MenuScene')
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
