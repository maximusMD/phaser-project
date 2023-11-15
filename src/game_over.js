import Phaser from 'phaser'
import mainMenuImg from './assets/menu_buttons/main-menu.png'
import credImg from './assets/menu_buttons/credits.png'
import controlsImg from './assets/menu_buttons/controls.png'
import gameOverImg from './assets/menu_buttons/game-over.png';


export class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    preload() {
        this.load.image('background', 'assets/bg.png')
        this.load.image('credits', credImg)
        this.load.image('controls', controlsImg)
        this.load.image('main-menu', mainMenuImg)
        this.load.image('game-over', gameOverImg)
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

        const controls = this.addButton(gameWidth * 0.517, gameHeight * 0.75, 'controls', () => {
            this.handleControls()
        })
        const controlsScaleFactor = gameWidth / controls.width; 
        controls.setScale(controlsScaleFactor * 0.21)

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
        
        const isLoggedIn = localStorage.getItem('loggedIn')
        const user = JSON.parse(localStorage.getItem('playerData'));
        const savedScore = JSON.parse(localStorage.getItem('score'))

        const gameOver = this.add.image(gameWidth * 0.52, gameHeight * 0.29, 'game-over');
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
                textData = this.add.text(gameWidth/2, gameHeight/2, `${playerName}! \n\n\nYOUR FINAL SCORE: ${savedScore}`, {
                    fontFamily: 'Pixelify Sans',
                    fontSize: '48px',
                    fill: '#FFFFFF',
                    align: 'center'
                })
                textGroup.add(textData);
                textGroup.setOrigin(0.5);
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

    handleControls() {
        this.scene.start('ControlsScene')
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
}