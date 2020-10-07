# Platform game
The player needs to eliminate all his enemies to win the game

# Assets
- **Sprite sheets:** [Jojo Jungle Pack] by [DidiGameB], 24 x 22 pixels / frame, license: CC-BY 3.0

[Jojo Jungle Pack]: https://opengameart.org/content/jojo-jambo-free-sprite-pack
[DidiGameB]: https://opengameart.org/users/didigameb

# Credit
- Inspired by the official [Phaser3 tutorial].
- Tilemap made with [tiled]. Also see this nice [tiled video tutorial], and this other tutorial about using these [tiles in phaser].

[Phaser3 tutorial]: https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
[tiled]: https://www.mapeditor.org/
[tiled video tutorial]: https://www.youtube.com/watch?v=ZwaomOYGuYo
[tiles in phaser]: https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6

# Usage
- Run development server: `npm run start`
- Deployment: `npm run build`
- After deployment, and to access the dist/index.html file, an http server is needed to serve sprite images from the hard-drive: `python3 -m http.server`


# Prerequisites
### Create a package.json
This file will list all the dependencies:

```bash
npm init -y
```

### Webpack
Webpack is module bundler for merging js/css files into one (optimal for browsers), and for automating the build process (like cmake). Webpack-cli is needed since webpack 4.

```bash
npm install --save-dev webpack webpack-cli
```

Webpack-dev-server works in-memory to refresh the browser automatically when files are modified:

```bash
npm install --save-dev webpack-dev-server
```

html-webpack-plugin is needed to generate automatically an index.html file:

```bash
npm install --save-dev html-webpack-plugin
```

file-loader is needed to copy images automatically on build:

```bash
npm install --save-dev file-loader
```

### Three.js and its performance monitor
```
npm install three stats.js --save
```

### ESLint
Run linter on javascript source file:

```bash
npm install eslint --save-dev
npx eslint --init
npx eslint src/app.js
```

### Documentation
Run jsdoc to generate documentation on javascript source file:

```bash
npm install --save-dev jsdoc
npx jsdoc src/app.js
```

### Vim
- As mentioned in [YouCompleteMe README][ycm], it needs to be installed using (node is required):

```bash
./install.py --ts-completer
```

If it was already installed, you need to force it to use TSServer instead of Tern by deleting the following folder:

```bash
third_party/ycmd/third_party/tern_runtime/node_modules
```

- Finally, check that YouCompleteMe (YCM) is running correctly by looking at the logs whose paths are printed with:

```bash
:YcmDebugInfo
```

[ycm]: https://github.com/ycm-core/YouCompleteMe#javascript-and-typescript-semantic-completion
[jsconfig]: https://code.visualstudio.com/docs/languages/jsconfig


# Tutorials
- Short [tutorial][1] to get started with webpack.
- A more comprehensive [tutorial][2] about project structure with webpack.

[1]: https://medium.com/@yakubova92/intro-to-webpack-46e8862d6627
[2]: https://hackernoon.com/webpack-the-basics-2712a7ad640b


# Icons
Icons are available on [this website][4] on a permissive license.

[4]: https://iconify.design/icon-sets/
