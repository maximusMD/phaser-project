import Phaser from "phaser";
import backToMain from '../src/assets/menu_buttons/main-menu.png';
import containerImg from '../src/assets/userform/box.png';
import inputImg from '../src/assets/userform/input.png';
import formTitleImg from '../src/assets/userform/sign-in-up.png'
import signinImg from '../src/assets/userform/sign-in.png';
import signupImg from '../src/assets/userform/sign-up.png';
import userImg from '../src/assets/userform/user.png';
import passImg from '../src/assets/userform/pass.png';

export class UserForm extends Phaser.Scene {
  constructor() {
    super({key: 'UserForm'});
  }

  preload() {
    this.load.image('backToMain', backToMain);
    this.load.image('container', containerImg);
    this.load.image('input', inputImg);
    this.load.image('formTitle', formTitleImg)
    this.load.image('signin', signinImg);
    this.load.image('signup', signupImg);
    this.load.image('user', userImg);
    this.load.image('pass', passImg);
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

    const inputForm = this.add.dom(gameWidth/2, gameHeight/2).createFromCache('userform');

    const formTitle = inputForm.getChildByID('form-title');
    formTitle.innerHTML = `<img src=${formTitleImg}>`

    const userLabel = inputForm.getChildByID('user-label');
    userLabel.innerHTML = `<img src=${userImg}>`;

    const passLabel = inputForm.getChildByID('pass-label');
    passLabel.innerHTML = `<img src=${passImg}>`

    const signUpBtn = inputForm.getChildByID('signup-button');
    signUpBtn.innerHTML = `<img src=${signupImg}>`

    const signInBtn = inputForm.getChildByID('signin-button');
    signInBtn.innerHTML = `<img src=${signinImg}>`

    backToMainButton.on('pointerdown', () => {
      this.scene.switch('MenuScene')
    })


    inputForm.addListener("submit")

    inputForm.on('submit', (e) => {
      e.preventDefault();
      const username = inputForm.getChildByName('username');
      const password = inputForm.getChildByName('password');
      const action = e.submitter;
      const userValue = username.value;
      const passValue = password.value;
      const actionValue = action.value;

      if (actionValue === 'Sign Up') {
        this.handleSignUp(userValue, passValue)
      } else if (actionValue === 'Sign In') {
        console.log(userValue)
        this.handleSignIn(userValue, passValue)
      }

    })

  }

  handleSignUp(username, password) {
    // will replace with real db
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify({username, pw: password}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleSignIn(username, password) {
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      body: JSON.stringify({username, pw: password}),
      headers: { 'Content-Type' : 'application/json'}
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message === 'Logged in') {
        console.log('User exists in the database');
      } else {
        console.log('User does not exist in the database')
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}