import Phaser from "phaser";
import backToMain from '../src/assets/menu_buttons/main-menu.png';
import containerImg from '../src/assets/userform/box.png';
import formTitleImg from '../src/assets/userform/sign-in-up.png'
import signinImg from '../src/assets/userform/sign-in.png';
import signupImg from '../src/assets/userform/sign-up.png';
import userImg from '../src/assets/userform/user.png';
import passImg from '../src/assets/userform/pass.png';
import logoutImg from '../src/assets/menu_buttons/logout.png';
import loadingImg from "./assets/animations/sprites/Loading assets/loadingImg.png"
import loadingAtlas from './assets/animations/sprites/Loading assets/loadingSpriteSheer.json'

export class UserForm extends Phaser.Scene {
  constructor() {
    super({ key: 'UserForm' });
  }

  preload() {
    this.load.image('backToMain', backToMain);
    this.load.image('container', containerImg);
    this.load.image('formTitle', formTitleImg);
    this.load.image('signin', signinImg);
    this.load.image('signup', signupImg);
    this.load.image('user', userImg);
    this.load.image('pass', passImg);
    this.load.image('logout', logoutImg);
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
    this.load.atlas('loadingBar', loadingImg, loadingAtlas);
  }

  create() {
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    const background = this.add.image(0, 0, 'background');
    background.displayWidth = gameWidth;
    background.displayHeight = gameHeight;
    background.setPosition(gameWidth / 2, gameHeight / 2);

    const backToMainButton = this.add.image(gameWidth * 0.1, gameHeight * 0.1, 'backToMain');
    backToMainButton.setInteractive();

    const isLoggedIn = localStorage.getItem('loggedIn')
    const user = JSON.parse(localStorage.getItem('playerData'));
    

    let textGroup = this.add.group()
    let textData = ''
    if (isLoggedIn == 'true') {
      const playerName = user.username.toUpperCase()
      WebFont.load({
        google: {
          families: ['Pixelify Sans'],
        },
        active: () => {
          textData = this.add.text(
            gameWidth / 2,
            gameHeight / 2,
            `WELCOME, ${playerName}!`,
            {
              fontFamily: "Pixelify Sans",
              fontSize: "50px",
              fill: "#ffffff",
            }
          );
          textGroup.add(textData);
          textGroup.setOrigin(0.42, 0.36);
        }
        
    })
    
      const logoutBtn = this.add.image(gameWidth / 1.92, gameHeight / 1.295, 'logout');
      logoutBtn.setInteractive();

      logoutBtn.on('pointerdown', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('playerData')
        this.scene.restart(); 
      });
    } else {
      const inputForm = this.add.dom(gameWidth / 1.9, gameHeight / 2.2).createFromCache('userform');

      const formTitle = inputForm.getChildByID('form-title');
      formTitle.innerHTML = `<img src=${formTitleImg}>`;

      const userLabel = inputForm.getChildByID('user-label');
      userLabel.innerHTML = `<img src=${userImg}>`;

      const passLabel = inputForm.getChildByID('pass-label');
      passLabel.innerHTML = `<img src=${passImg}>`;

      const signUpBtn = inputForm.getChildByID('signup-button');
      signUpBtn.innerHTML = `<img src=${signupImg}>`;

      const signInBtn = inputForm.getChildByID('signin-button');
      signInBtn.innerHTML = `<img src=${signinImg}>`;

      inputForm.addListener("submit");

      inputForm.on('submit', (e) => {
        e.preventDefault();
        const loadingBar = this.add.sprite(gameWidth/1.93, gameHeight /1.75, 'loadingBar', 'loading0.png');
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
        inputForm.setVisible(false);
        const username = inputForm.getChildByName('username');
        const password = inputForm.getChildByName('password');
        const action = e.submitter;
        const userValue = username.value;
        const passValue = password.value;
        const actionValue = action.value;

        if (actionValue === 'Sign Up') {
          this.handleSignUp(userValue, passValue);
        } else if (actionValue === 'Sign In') {
          this.handleSignIn(userValue, passValue);
        }
      });
    }

    backToMainButton.on('pointerdown', () => {
      this.scene.switch('MenuScene');
    });
  }

  handleSignUp(username, password) {
    // will replace with real db
    fetch('https://wavy-project-gang-api.onrender.com/api/users', {
      method: 'POST',
      body: JSON.stringify({username, password: password}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      if(data.status === 400){
        alert('user alredy exists')
        this.scene.restart();
      }else{
      localStorage.setItem('playerData', JSON.stringify(data.user));
      localStorage.setItem('loggedIn', 'true');
      this.scene.restart()}
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleSignIn(username, password) {
    fetch('https://wavy-project-gang-api.onrender.com/api/users/login', {
      method: 'POST',
      body: JSON.stringify({username, password: password}),
      headers: { 'Content-Type' : 'application/json'}
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.code === 404) {
        alert('wrong username or password')
        console.log('User does not exist in the database')
        this.scene.restart();
      } else {
        localStorage.setItem('playerData', JSON.stringify(data.user[0].user))
        localStorage.setItem('loggedIn', 'true');
        this.scene.restart(); 
      }
    })
    .catch((err) => {
      console.log(err);
    })
    const user = localStorage.getItem('playerData');
    if (user) {
      console.log(user);
      this.scene.restart();
    }
  }
}