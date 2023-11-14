import Phaser from "phaser";
import mainMenuImg from "./assets/menu_buttons/main-menu.png";
import lbImg from "./assets/menu_buttons/leaderboard.png";
import credImg from "./assets/menu_buttons/credits.png";
import loadingImg from "./assets/animations/sprites/Loading assets/loadingImg.png"
import loadingAtlas from './assets/animations/sprites/Loading assets/loadingSpriteSheer.json'

export class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LeaderboardScene",
    });
  }
  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
    this.load.image("background", "assets/bg.png");
    this.load.image("main-menu", mainMenuImg);
    this.load.image("leaderboard", lbImg);
    this.load.image("credits", credImg);
    this.load.atlas('loadingBar', loadingImg, loadingAtlas)
  }
  create() {
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;
    const background = this.add.image(0, 0, "background");
    background.displayWidth = gameWidth;
    background.displayHeight = gameHeight;
    background.setPosition(gameWidth / 2, gameHeight / 2);

    const mainMenu = this.addButton(
      gameWidth * 0.9,
      gameHeight * 0.1,
      "main-menu",
      () => {
        this.handleMain();
      }
    );
    const mainMenuScaleFactor = gameWidth / mainMenu.width;
    mainMenu.setScale(mainMenuScaleFactor * 0.1835);



    const credits = this.addButton(
      gameWidth * 0.1,
      gameHeight * 0.9,
      "credits",
      () => {
        this.handleCredits();
      }
    );
    const creditsScaleFactor = gameWidth / credits.width;
    credits.setScale(creditsScaleFactor * 0.1835);

    const leaderboard = this.add.image(
      gameWidth * 0.52,
      gameHeight * 0.29,
      "leaderboard"
    );
    const titleScaleFactor = gameWidth / leaderboard.width;
    leaderboard.setScale(titleScaleFactor * 0.55);
    WebFont.load({
      google: {
        families: ["Pixelify Sans"],
      },
      active: () => {
        
        const loadingBar = this.add.sprite(gameWidth/2, gameHeight /2, 'loadingBar', 'loading0.png');
        const loadingBarScaleFactor = gameWidth / loadingBar.width
        loadingBar.setScale(loadingBarScaleFactor * 0.135)
    
        this.anims.create({
            key: 'loadingAnimation',
            frames: this.anims.generateFrameNames('loadingBar', {
                prefix: 'Loading-',
                start: 0,
                end: 42,
                zeroPad: 1,
                suffix: '.png',
            }),
            repeat: -1,
            frameRate: 3
        });
    
        loadingBar.play('loadingAnimation');

        fetch("https://wavy-project-gang-api.onrender.com/api/leaderboard")
          .then((response) => response.json())
          .then((data) => {
            const textGroup = this.add.group();
            loadingBar.destroy();
            for (let i = 0; i < 4; i++) {
              const user = data[i];
              const textData = `<${user.username} - ${user.highScore}>\n`;
              const textObject = this.add.text(
                gameWidth / 2,
                400 + i * 50,
                textData,
                {
                  fontFamily: "Pixelify Sans",
                  fontSize: "30px",
                  fill: "#ffffff",
                }
              );
              textObject.setOrigin(0.5);
              textGroup.add(textObject);
            }
          })
          .catch((error) => {
            console.error("error fetching data:", error);
          });
      },
    });
  }
  addButton(x, y, key, onClick) {
    const button = this.add.image(x, y, key);
    button.setInteractive();
    button.on("pointerdown", onClick);
    return button;
  }
  handleMain() {
    this.scene.start("MenuScene");
  }
  handleCredits() {
    this.scene.start("CreditsScene");
  }
}
