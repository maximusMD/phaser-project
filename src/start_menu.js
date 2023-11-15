import Phaser from 'phaser';
import guestImg from './assets/menu_buttons/guest.png';
import lbImg from './assets/menu_buttons/leaderboard.png';
import signInImg from './assets/menu_buttons/sign-in-up.png';
import shareImg from './assets/menu_buttons/share.png';
import credImg from './assets/menu_buttons/credits.png';
import optImg from './assets/menu_buttons/options.png';
import aboutImg from './assets/menu_buttons/about.png';
import menuMusic from './assets/menuMusic.wav';
import logoutImg from '../src/assets/menu_buttons/logout.png';
import playImg from './assets/menu_buttons/play.png';



export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'MenuScene'
        });
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('sign-in', signInImg);
        this.load.image('guest', guestImg);
        this.load.image('leaderboard', lbImg);
        this.load.image('credits', credImg);
        this.load.image('share', shareImg);
        this.load.image('options', optImg);
        this.load.image('about', aboutImg);
        this.load.image('logout', logoutImg);
        this.load.image('play', playImg);
        this.load.audio('menuMusic', menuMusic);
        
        this.load.script(
            "webfont",
            "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          );
    }

    create() {
        const musicEnabled = localStorage.getItem('musicEnabled');

        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        const background = this.add.image(0, 0, 'background');
        background.displayWidth = gameWidth;
        background.displayHeight = gameHeight;
        background.setPosition(gameWidth / 2, gameHeight / 2);

        const title = this.add.image(gameWidth * 0.52, gameHeight * 0.29, 'title');
        const titleScaleFactor = gameWidth / title.width;
        title.setScale(titleScaleFactor * 0.55);

        const isLoggedIn = localStorage.getItem('loggedIn')
        const user = JSON.parse(localStorage.getItem('playerData'))
        let textGroup = this.add.group()
        let textData = ''
        if(isLoggedIn){
            WebFont.load({
                google: {
                  families: ['Pixelify Sans'],
                },
                active: () => {
                  textData = this.add.text(
                    gameWidth / 2,
                    gameHeight / 2,
                    `WELCOME, ${user.username}!`,
                    {
                      fontFamily: "Pixelify Sans",
                      fontSize: "50px",
                      fill: "#ffffff",
                    }
                  );
                  textGroup.add(textData);
                  textGroup.setOrigin(0.5);
                }
                
            })
            //add play button here wheb rady
            const play = this.addButton(gameWidth * 0.517, gameHeight * 0.63, 'play', () => {
                this.stopMenuMusicAndStartScene('MaxLevel');
            });

            const logOut = this.addButton(gameWidth * 0.517, gameHeight * 0.74, 'logout', () => {
                localStorage.clear()
                this.scene.restart(); 
            });
        }else{
            const signIn = this.addButton(gameWidth * 0.517, gameHeight * 0.48, 'sign-in', () => {
                this.stopMenuMusicAndStartScene('UserForm');           
            });
            const guest = this.addButton(gameWidth * 0.517, gameHeight * 0.63, 'guest', () => {
                this.stopMenuMusicAndStartScene('MaxLevel');
            });
        }

        const lb = this.addButton(gameWidth * 0.517, gameHeight * 0.855, 'leaderboard', () => {
            this.stopMenuMusicAndStartScene('LeaderboardScene');
        });
        const lbScaleFactor = gameWidth / lb.width; 
        lb.setScale(lbScaleFactor * 0.229)

        const about = this.addButton(gameWidth * 0.1, gameHeight * 0.1, 'about', () => {
            this.stopMenuMusicAndStartScene('AboutScene');
        });
        const aboutScaleFactor = gameWidth / about.width; 
        about.setScale(aboutScaleFactor * 0.16)

        const credits = this.addButton(gameWidth * 0.1, gameHeight * 0.9, 'credits', () => {
            this.stopMenuMusicAndStartScene('CreditsScene');
        });
        const creditsScaleFactor = gameWidth / credits.width; 
        credits.setScale(creditsScaleFactor * 0.1835)

        const share = this.addButton(gameWidth * 0.915, gameHeight * 0.9, 'share', () => {
            console.log('Share');
        });
        const shareScaleFactor = gameWidth / share.width; 
        share.setScale(shareScaleFactor * 0.16)

        const options = this.addButton(gameWidth * 0.9, gameHeight * 0.1, 'options', () => {
            this.stopMenuMusicAndStartScene('OptionsScene');
        });
        const optionsScaleFactor = gameWidth / options.width; 
        options.setScale(optionsScaleFactor * 0.1835)

        const menuMusic = this.sound.add('menuMusic')
        if (musicEnabled === 'true') {
            menuMusic.play();
        }
    }

    addButton(x, y, key, onClick) {
        const button = this.add.image(x, y, key);
        button.setInteractive();
        button.on('pointerdown', onClick);
        return button;
    }

    stopMenuMusicAndStartScene(sceneKey) {
        const menuMusic = this.sound.get('menuMusic');
        if (menuMusic) {
            menuMusic.stop();
        }
        this.scene.start(sceneKey);
    }

    // openExternalLink(url) {
    //     window.open(url, '_blank');
    // }
}
