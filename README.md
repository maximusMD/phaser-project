# Dark Descent

ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 5](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.60.0 version and above.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) into the `dist` folder |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Handling Assets

This template provides support for both embedding images and loading them from a static folder. To embed an image, you can import it at the top of the file you are using it in:

```js
import logoImg from './assets/logo.png'
```

To load static files such as images, audio files, videos, etc place them into the `public/assets` folder. Then you can use this path in the Loader calls within Phaser:

```js
    preload ()
    {
        //  This is an example of a bundled image:
        this.load.image('logo', logoImg);

        //  This is an example of loading a static image from the public folder:
        this.load.image('background', 'assets/bg.jpg');
    }
```

When you do `npm run build` it will use the copy-webpack-plugin to copy the `public/assets` folder into `dist/assets`. Remember to include this folder when you deploy your game to a server.

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

    ```
"browsers": [
    ">0.25%",
    "not ie 11",
    "not op_mini all"
]
    ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.

is an exciting game where you navigate through challenges and waves to achieve the highest score possible. Compete with others on the leaderboard and prove your skills!

## Table of Contents
- [Dark Descent](#dark-descent)
  - [Requirements](#requirements)
  - [Available Commands](#available-commands)
  - [Writing Code](#writing-code)
  - [Handling Assets](#handling-assets)
  - [Customizing the Template](#customizing-the-template)
    - [Babel](#babel)
    - [Webpack](#webpack)
  - [Deploying Code](#deploying-code)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Gameplay](#gameplay)
  - [Scenes](#scenes)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [License](#license)

## Installation
1. Clone the repository: `git clone https://github.com/your-username/wavy-project-gang.git`
2. Install dependencies: `npm install`
3. Run the game: `npm start`

## Gameplay
Navigate through challenges and waves, collect points, and try to survive as long as possible. The game provides an immersive experience with stunning visuals and engaging mechanics.

## Scenes
- **MenuScene**: The main menu of the game.
- **GameScene**: The core gameplay scene where the player navigates challenges.
- **WinnerScene**: Displayed when the player successfully completes the game.
- **GameOverScene**: Displayed when the player fails to survive the challenges.

## Features
- Leaderboard: Compete with other players and see your rank on the leaderboard.
- Stunning Visuals: Enjoy a visually appealing game environment.
- Responsive Controls: Smooth and responsive controls for an immersive gaming experience.

## Dependencies
- [Phaser](https://phaser.io/): A fast, robust, and versatile game framework for JavaScript.

## Contributing
Contributions are welcome! If you find a bug or have an enhancement in mind, feel free to open an issue or submit a pull request. Please follow the [contributing guidelines](CONTRIBUTING.md).

## License
This project is licensed under the [MIT License](LICENSE).