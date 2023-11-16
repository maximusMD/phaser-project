import Phaser from 'phaser'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import credImg from './assets/menu_buttons/credits.png'
import aboutImg from './assets/menu_buttons/about.png'
import winner from './assets/menu_buttons/survived.png'
import shareImg from './assets/menu_buttons/share.png';

export class WinnerScene extends Phaser.Scene {
    constructor() {
        super('WinnerScene')
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('credits', credImg)
        this.load.image('about', aboutImg)
        this.load.image('main-menu', mainMenuImg)
        this.load.image('winner', winner)
        this.load.image('share', shareImg);
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const isLoggedIn = localStorage.getItem('loggedIn')
        const user = JSON.parse(localStorage.getItem('playerData'));
        const savedScore = JSON.parse(localStorage.getItem('score'))
        let playerName = 'GUEST'
        if (isLoggedIn == 'true') { 
            this.handleScore(user, savedScore);
            playerName = user.username.toUpperCase()
        }

        let textGroup = this.add.group()
        let textData = ''

        WebFont.load({
            google: {
                families: ['Pixelify Sans'],
            },
            active: () => {
                textData = this.add.text(gameWidth/2, gameHeight/2, `${playerName}!!!!! \n\nYOUR FINAL SCORE: ${savedScore}`, {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '48px',
                    fill: '#FFFFFF',
                    align: 'center'
                })
                textGroup.add(textData);
                textGroup.setOrigin(0.43, 0.45);
            }
        })

        const winner = this.add.image(gameWidth * 0.47, gameHeight * 0.25, 'winner');
		const winnerScaleFactor = gameWidth / winner.width;
		winner.setScale(winnerScaleFactor * 0.65);

        const about = this.addButton(gameWidth * 0.517, gameHeight * 0.75, 'about', () => {
            this.handleAbout()
        })
        const aboutScaleFactor = gameWidth / about.width; 
        about.setScale(aboutScaleFactor * 0.21)

        const credits = this.addButton(gameWidth * 0.1, gameHeight * 0.9, 'credits', () => {
            this.handleCredits()
        });
        const creditsScaleFactor = gameWidth / credits.width; 
        credits.setScale(creditsScaleFactor * 0.1835)

        const mainMenu = this.addButton(gameWidth * 0.9, gameHeight * 0.1, 'main-menu', () => {
            this.handleMain()
        });
        const mainMenuScaleFactor = gameWidth / mainMenu.width; 
        mainMenu.setScale(mainMenuScaleFactor * 0.1835)

        const share = this.addButton(gameWidth * 0.915, gameHeight * 0.9, 'share', () => {
			const currentURL = window.location.href;
			this.copyToClipboard(currentURL);
			alert('URL copied to clipboard: ' + currentURL)
		});
		const shareScaleFactor = gameWidth / share.width;
		share.setScale(shareScaleFactor * 0.16);
    }

    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    handleCredits() {
        this.scene.start('CreditsScene')
    }

    handleAbout() {
        this.scene.start('AboutScene')
    }

    handleMain() {
        this.scene.start('MenuScene')
    }
    handleScore(user, savedScore){
        const authToken = JSON.stringify({"user":user} )
        fetch('https://wavy-project-gang-api.onrender.com/api/leaderboard', {
                method: 'POST',
                body: JSON.stringify({ highScore: savedScore }, {level:'Max_level'}),
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
        },
        })
        .then((res) => {
        if (!res.ok) {
        throw new Error(`error: ${res.status}`);
        }
        return res.json();
        })
        .then((data) => {
        console.log(data);
        })
        .catch((err) => {
        console.error('error:', err);
        })
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