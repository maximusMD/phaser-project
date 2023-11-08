import Phaser from "phaser";
import backToMain from '../src/assets/menu_buttons/main-menu.png';

export class UserForm extends Phaser.Scene {
  constructor() {
    super({key: 'UserForm'});
  }

  preload() {
    this.load.image('backToMain', backToMain);
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

    backToMainButton.on('pointerdown', () => {
      this.scene.switch('MenuScene')
    })

    const inputForm = this.add.dom(gameWidth/2, gameHeight/2).createFromCache('userform');

    inputForm.addListener("submit")

    inputForm.on('submit', (e) => {
      e.preventDefault();
      const username = inputForm.getChildByName('username');
      const password = inputForm.getChildByName('password');
      const action = e.submitter;
      const userValue = username.value;
      const passValue = password.value;
      const actionValue = action.value;

      console.log(action);

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