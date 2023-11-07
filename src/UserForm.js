import Phaser from "phaser";

export class UserForm extends Phaser.Scene {
  constructor() {
    super({key: 'UserForm'});
  }

  create() {
    let background = this.add.image(400, 300, 'background');
    background.setScale(
      this.game.config.width / background.width,
      this.game.config.height / background.height
    )

    const inputForm = this.add.dom(400, 300).createFromCache('userform');

    inputForm.addListener("submit")

    inputForm.on('submit', (e) => {
      e.preventDefault();
      const username = inputForm.getChildByName('username');
      const password = inputForm.getChildByName('password');
      const userValue = username.value;
      const passValue = password.value;
      this.handleFormSubmission(userValue, passValue)
    })

  }

  handleFormSubmission(username, password) {
    // will replace with real db
    fetch('http://localhost:3000/submit', {
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
}