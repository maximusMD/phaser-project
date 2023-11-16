import Phaser from 'phaser'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import credImg from './assets/menu_buttons/credits.png'
import gameOverImg from './assets/menu_buttons/game-over.png';
import shareImg from './assets/menu_buttons/share.png';


export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('credits', credImg)
        this.load.image('main-menu', mainMenuImg)
        this.load.image('game-over', gameOverImg)
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
        
        const isLoggedIn = localStorage.getItem('loggedIn')
        const user = JSON.parse(localStorage.getItem('playerData'));
        const savedScore = JSON.parse(localStorage.getItem('score'))

        const gameOver = this.add.image(gameWidth * 0.53, gameHeight * 0.29, 'game-over');
        const titleScaleFactor = gameWidth / gameOver.width;
        gameOver.setScale(titleScaleFactor * 0.55);
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
                textData = this.add.text(gameWidth/2, gameHeight/2, `${playerName}! \n\nYOUR FINAL SCORE: ${savedScore}`, {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '48px',
                    fill: '#FFFFFF',
                    align: 'center'
                })
                textGroup.add(textData);
                textGroup.setOrigin(0.43, 0.35);
            }
        })
       
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