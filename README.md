# Real-Time Web @cmda-minor-web · 2019-2020

<p align="center">
  <a href="https://rocky-headland-12149.herokuapp.com/">
    <img src="https://img.shields.io/badge/demo-LIVE-brightgreen.svg?style=flat-square" alt="Demo">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/MarjoleinAardewijn/real-time-web-1920/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License">
  </a>
</p>

![App Home]( "App Home")

## Description

...

## Table of Contents

* [To Do](#To-do)
* [Installation](#Installation)
  * [Development](#Development)
  * [Production](#Production)
* [API](#Api)
* [Feature Wishlist](#Feature-Wishlist)
* [Sources](#Sources)
* [Credits](#Credits)

## To do

- [ ] ...

## Installation

See the installation guide to learn how to install and use the app.

<details>
    <summary>Installation Guide</summary>

Go via the terminal to the folder you want the project to be placed:

```
    cd Path/To/Folder
```

Clone the repository and go to the project folder:

```
    git clone https://github.com/MarjoleinAardewijn/real-time-web-1920.git && cd real-time-web-1920
```

After cloning the project go to the docs folder:

```
    cd docs
```

Install npm:

```
    npm init
```

Install all the dependencies:

```
    npm install
```

### Development

When in development, run the following command to watch the changes:

```
    npm run dev:watch
```

In you browser. go to:

```
   localhost:5000 
```

### Production

When the app the finished use Heroku to deploy it.

First, login to Heroku:
```
    heroku login
```

Deploy the app by creating a new domain on Heroku. Heroku generates a random name for your app.
```
    heroku create
```

Clone the repository:
```
    heroku git:remote -a name-of-the-app
```

Push master branch to Heroku:
```
    git add .
    git commit -m "Heroku"
    git push heroku master
```

Open the app in your browser to check if everything went well:
```
    heroku open
```

To see the logs when something went wrong, run the following command:
```
    heroku logs --tail
```
</details>

## API

The API that is used for this app is the ... API.

For getting ... I used the following API endpoint:

> https://

This will be returning the following data:

<details>
 <summary>Json Data</summary>

```json
...
```
</details>

## Feature Wishlist

...

## Sources

The sources I used the most during the development of the app are:
- [ExpressJS](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://nodemon.io/)
- [Node-Fetch](https://www.npmjs.com/package/node-fetch)
- [GulpJS](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Gulp Sass](https://www.npmjs.com/package/gulp-sass)
- [Gulp Clean CSS](https://www.npmjs.com/package/gulp-clean-css)
- [Gulp Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [Gulp Concat](https://www.npmjs.com/package/gulp-concat)
- [Gulp Minify](https://www.npmjs.com/package/gulp-minify)
- [Rimraf](https://www.npmjs.com/package/rimraf)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [Chokidar](https://www.npmjs.com/package/chokidar-cli)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [Socket.IO](https://socket.io/)

## Credits

- [Socket.IO Tutorial](https://socket.io/get-started/chat/)
