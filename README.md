# Real-Time Web @cmda-minor-web · 2019-2020

<p align="center">
  <a href="https://marjolein-real-time-web-1920.herokuapp.com/">
    <img src="https://img.shields.io/badge/demo-LIVE-brightgreen.svg?style=flat-square" alt="Demo">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/MarjoleinAardewijn/real-time-web-1920/blob/master/LICENSE.txt">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License">
  </a>
</p>

![App Home](https://user-images.githubusercontent.com/23479038/81078686-d4192600-8eee-11ea-8eae-be55f3cb4b3d.png "App Home")

## Description

This app shows on one side the data related to the corona virus and on the other side positive tweets with hashtags like for example #daslief from [SIRE](https://sire.nl/campagne-overzicht/jaren/20/items).
The idea behind this app is to show people even though it are difficult times right now, we help each other more than normally and that there are still a lot of positive things happening in the world.

## Table of Contents

* [To Do](#To-do)
* [Installation](#Installation)
  * [Development](#Development)
  * [Production](#Production)
* [How it works](#How-it-works)
  * [Data Life Cycle Diagram](#Data-Life-Cycle-Diagram)
  * [Real Time Events](#Real-Time-Events)
  * [Dependencies](#Dependencies)
    * [Core Dependencies](#Core-Dependencies)
    * [Dev Dependencies](#Dev-Dependencies)
* [API's](#API's)
* [Feature Wishlist](#Feature-Wishlist)
* [Sources](#Sources)
* [Credits](#Credits)

## To do

- [ ] Add database

## Installation

See the installation guide to learn how to install and use the app.

<details>
    <summary>Installation Guide</summary>

Go via the terminal to the folder you want the project to be placed:

```
    cd Path/To/Folder
```

Clone the repository (and submodules) and go to the project folder:

```
    git clone --recurse-submodules https://github.com/MarjoleinAardewijn/real-time-web-1920.git && cd real-time-web-1920
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

In you browser go to:

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

## How it works
### Data Life Cycle Diagram

![Data Life Cycle Diagram](https://user-images.githubusercontent.com/23479038/81094680-26b10d00-8f04-11ea-9d12-f36165e0b54d.png "Data Life Cycle Diagram")

In the above **Data Life Cycle** (DLC) I summarize the interaction and data visually. When a user requests Twitter or Corona data,
a request is send to the **server**. If it's a request to the Track Corona API the **server** will first check if the data is already in 
the **database**. If this is the case the data from the **database** is send back to the **server**, if this is not the case the 
**server** will send a **fetch request** to the **API**. \
If it's a request to the Twitter API the **server** will send a **fetch request** to the **API** immediately.
When the **server** gets the data from one of the **API's** or the **database**, the **data will be sorted** and **stored in an array**. 
After the data is stored in the array, a `socket.emit` event is send to the **client** with the new data. When the **client** receives 
the `emit`, the UI will be updated so that the user can see the new requested data.

The data from Twitter will also be updated when there is a new tweet from a, by the user selected, hashtag. In this case the **API** will send
the data to the **server**. The data will be **stored in the array** and a `socket.emit` event is send to all the **clients** with the data. 
When the **client** receives the `emit`, the UI will be updated so that all the connected users who have selected 
that hashtag can see the new tweet. This is possible because of an established connection to the **streaming API from Twitter**.

The Corona data is updated every 40 minutes. Since the Track Corona API is a REST API the **server** will send a request 
to the **API** every 40 minutes and check if the data is changed. If this is the case, the data will be updated or saved in 
the **database**. The **database** will send the data back to the **server** and a `socket.emit` event is send to all 
the **clients** with the updated data. When the **client** receives the `emit`, the UI will be updated so that the user 
can see the updated data.

### Real Time Events

This app has the following custom real time events:

- `corona country data`: gets all the corona data from all the countries.
- `corona top 3`: gets the corona data of the top 3 countries who has the most confirmed cases.
- `get another country`: gets the corona data of a specific country chosen by the user.
- `get tweets`: gets all the tweets with the default hashtag `#daslief` (shows max 10 tweets to the user).
- `new tweet`: gets new tweets that are posted with the hashtag the user is looking at at that time.
- `change hashtag`: gets all the tweets from another hashtag which is chosen by the user via a select box.

### Dependencies
#### Core Dependencies

- [express](https://www.npmjs.com/package/express)
- [ejs](https://www.npmjs.com/package/ejs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-minify](https://www.npmjs.com/package/gulp-minify)
- [rimraf](https://www.npmjs.com/package/rimraf)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [twitter](https://www.npmjs.com/package/twitter)
- [heroku](https://www.npmjs.com/package/heroku)

#### Dev Dependencies

- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Concurrently](https://www.npmjs.com/package/concurrently)
- [Chokidar](https://www.npmjs.com/package/chokidar-cli)

## API's

For this app I used 2 API's:
- [Track Corona API](https://www.trackcorona.live/)
- [Twitter API](https://www.npmjs.com/package/twitter)

### Track Corona API

#### API key
This API doesn't require an API key. But you need to give them credits in your app or website. 
I did this by adding a link to the API in the footer.

#### Usage
For getting the Corona data I used the following API endpoint:

> https://www.trackcorona.live/api/countries

This will be returning the following data:

<details>
  <summary>Json Data</summary>

```json
{ code: 200,
   data:
   [ 
      { 
        location: 'Spain',
        country_code: 'es',
        latitude: 40.463667,
        longitude: -3.74922,
        confirmed: 200210,
        dead: 20852,
        recovered: 80587,
        updated: '2020-04-20 18:00:12.333812+00:00',
      },
      { 
        location: 'Iran',
        country_code: 'ir',
        latitude: 32.427908,
        longitude: 53.688046,
        confirmed: 83505,
        dead: 5209,
        recovered: 59273,
        updated: '2020-04-20 18:00:12.742096+00:00',
      },
      { 
        location: 'Madagascar',
        country_code: 'mg',
        latitude: -18.766947,
        longitude: 46.869107,
        confirmed: 121,
        dead: 0,
        recovered: 41,
        updated: '2020-04-20 18:00:20.943783+00:00',
      },
      { 
        location: 'Qatar',
        country_code: 'qa',
        latitude: 25.354826,
        longitude: 51.183884,
        confirmed: 6015,
        dead: 9,
        recovered: 555,
        updated: '2020-04-20 18:00:14.742716+00:00',
      },
      ...
   ]
}
```
</details>

#### Rate Limit

This API doesn't have a rate limit.

### Twitter API

#### API Key
For getting tweets from specific hashtags you first need to apply for an API key at Twitter. For this you need to specify why you want to use Twitter and how you are intending to use the data.
It can take a while till you get an email back from them (in my case it took a week) with the information if they approved your application or not. If they did, you can create an app and get the API key.

#### Usage
For getting the data from the API I used the [NPM Package `twitter`](https://www.npmjs.com/package/twitter). This is an asynchronous client library for the Twitter [REST and Streaming](https://developer.twitter.com/en/docs) API's.

**Installation**

You can install this package by running `npm i twitter` in your terminal.

**Getting started**

To get the data you first need to require the package in `server.js`:

```js
const twitter = require('twitter');
```

Then you need to configure the required keys and tokens. For security it's best to configure them in your `.env` file and then invoke them in your code:

```js
const twitterConfig = () => {
    return new twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
};
```

For seperation of concerns I chose to write all the above in a module (`twitter-api.js`): 

```js
const twitter = require('twitter');

const twitterConfig = () => {
    return new twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
};

module.exports = { twitterConfig };
```

And add that module to my `server.js` file:

```js
const twitterApi = require('./scripts/modules/twitter-api');
```

A second reason why I did this is because you need to create a new twitter instance for every connection. This way it's 
easier to create a new connection, since this I only need to invoke a the configuration and assign it to a new variable:

```js
const twitterClientStream = twitterApi.twitterConfig(),
      twitterClient = twitterApi.twitterConfig();
```

After creating a connection you can use the twitter **REST API** as follows inside the socket.IO connection:

```js
ioInstance.on('connection', (socket) => {
    console.log('socket created');
    
    twitterClient.get('search/tweets', {q: '#daslief'}, (error, tweets, response) => {
        console.log(tweets);
        // code here to emit tweets to client.
    });
    
    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
});
```

This will be returning the following data:

<details>
  <summary>JSON response</summary>

```json
{ statuses:
   [ 
     { 
       created_at: 'Tue May 05 10:32:03 +0000 2020',
       id: 1257619058343710700,
       id_str: '1257619058343710720',
       text: 'What a beautiful idea! #Daslief 🙏 🇬🇧 🇨🇦 🇺🇸 🇳🇴 🇫🇷 🇵🇱 🇩🇪 🇳🇿 🇦🇺 for your message on our day commemorating… https://t.co/nyl7bDUh7R',
       truncated: true,
       entities: [Object],
       metadata: [Object],
       source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
       in_reply_to_status_id: null,
       in_reply_to_status_id_str: null,
       in_reply_to_user_id: null,
       in_reply_to_user_id_str: null,
       in_reply_to_screen_name: null,
       user: [Object],
       geo: null,
       coordinates: null,
       place: null,
       contributors: null,
       is_quote_status: true,
       quoted_status_id: 1257587101643747300,
       quoted_status_id_str: '1257587101643747328',
       quoted_status: [Object],
       retweet_count: 0,
       favorite_count: 0,
       favorited: false,
       retweeted: false,
       possibly_sensitive: false,
       lang: 'en',
     },
     
     ...
      
     { 
       created_at: 'Tue May 05 05:59:00 +0000 2020',
       id: 1257550344734859300,
       id_str: '1257550344734859264',
       text: '@MinPres #coronavirusNederland #Kawasaki #blijfbinnen #gezondverstand #daslief #CovidIdiots @rivm https://t.co/yJFrJf4Jm6',
       truncated: false,
       entities: [Object],
       extended_entities: [Object],
       metadata: [Object],
       source: '<a href="http://twitter.com/download/iphone" rel="nofollow">Twitter for iPhone</a>',
       in_reply_to_status_id: null,
       in_reply_to_status_id_str: null,
       in_reply_to_user_id: 155507136,
       in_reply_to_user_id_str: '155507136',
       in_reply_to_screen_name: 'MinPres',
       user: [Object],
       geo: null,
       coordinates: null,
       place: null,
       contributors: null,
       is_quote_status: false,
       retweet_count: 0,
       favorite_count: 0,
       favorited: false,
       retweeted: false,
       possibly_sensitive: false,
       lang: 'und',
     } 
   ],
   search_metadata:
   { 
     completed_in: 0.061,
     max_id: 1257619058343710700,
     max_id_str: '1257619058343710720',
     next_results: '?max_id=1257550344734859263&q=%23daslief&include_entities=1',
     query: '%23daslief',
     refresh_url: '?since_id=1257619058343710720&q=%23daslief&include_entities=1',
     count: 15,
     since_id: 0,
     since_id_str: '0',
   }
}
```
</details>

If you want to use the streaming API to get real time data you need to create a new stream (outside the socket.IO connection):

```js
twitterClientStream.stream('statuses/filter', {track: '#daslief'}, (stream) => {
    stream.on('data', function(event) {
        console.log(event);
        // code here to emit new tweets to client.
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});
```

This will be returning the following data when a new tweet is posted:

<details>
    <summary>JSON response</summary>

```json
{ 
  created_at: 'Tue May 05 11:21:51 +0000 2020',
  id: 1257631592505376800,
  id_str: '1257631592505376770',
  text: '#daslief',
  source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user:
  { 
     id: 1252166709345169400,
     id_str: '1252166709345169411',
     name: 'Marjolein Minor Web Development',
     screen_name: 'Marjolein_MWD',
     location: null,
     url: null,
     description: null,
     translator_type: 'none',
     protected: false,
     verified: false,
     followers_count: 0,
     friends_count: 0,
     listed_count: 0,
     favourites_count: 0,
     statuses_count: 1,
     created_at: 'Mon Apr 20 09:26:54 +0000 2020',
     utc_offset: null,
     time_zone: null,
     geo_enabled: false,
     lang: null,
     contributors_enabled: false,
     is_translator: false,
     profile_background_color: 'F5F8FA',
     profile_background_image_url: '',
     profile_background_image_url_https: '',
     profile_background_tile: false,
     profile_link_color: '1DA1F2',
     profile_sidebar_border_color: 'C0DEED',
     profile_sidebar_fill_color: 'DDEEF6',
     profile_text_color: '333333',
     profile_use_background_image: true,
     profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
     profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
     default_profile: true,
     default_profile_image: false,
     following: null,
     follow_request_sent: null,
     notifications: null,
  },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  is_quote_status: false,
  quote_count: 0,
  reply_count: 0,
  retweet_count: 0,
  favorite_count: 0,
  entities:
  { 
     hashtags: [ [Object] ],
     urls: [],
     user_mentions: [],
     symbols: [],
  },
  favorited: false,
  retweeted: false,
  filter_level: 'low',
  lang: 'und',
  timestamp_ms: '1588677711975',
}
```
</details>

#### Rate Limits

**Twitter REST API**

Twitter has different rate limits for all the GET endpoints. The rate limits can be found [here](https://developer.twitter.com/en/docs/basics/rate-limits).

For this app I used the GET endpoint: `search/tweets`. This endpoint has the following rate limit:

| Endpoint                | Resource family    | Requests / window (user auth)  | Requests / window (app auth) |
| ----------------------- |:------------------:| :----------------------------: | ----------------------------:|
| GET search/tweets       | search             | 180                            | 450                          |

For more information see the [Twitter Docs about rate limiting](https://developer.twitter.com/en/docs/basics/rate-limiting).

**Twitter Streaming API**

For the streaming API Twitter says the following:

> Twitter does not make public the number of connection attempts which will cause a rate limiting to occur, but there is 
some tolerance for testing and development. A few dozen connection attempts from time to time will not trigger a limit. 
However, it is essential to stop further connection attempts for a few minutes if a HTTP 420 response is received. If 
your client is rate limited frequently, it is possible that your IP will be blocked from accessing Twitter for an 
indeterminate period of time.

For more information see the [Twitter Docs about filtering tweets realtime](https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/connecting).

## Feature Wishlist

- [ ] Save Corona data in a database.
- [ ] Show if the Corona data is increased or decreased in the last 24 hours.
- [ ] Let a user type in a hashtag he/she wants to see.

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
- [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

## Credits

- [Slice](https://www.w3schools.com/jsref/jsref_slice_array.asp)
- [Sort Array Desc](https://stackoverflow.com/questions/54151954/how-to-sort-json-array-elements-in-descending-order)
- [Colors](https://material.io/resources/color/#!/?view.left=0&view.right=0)
- [Get Index Of Object With Specific Value](https://stackoverflow.com/questions/36419195/get-index-from-a-json-object-with-value)
- [Sort array by date](https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property)
- [Get first n number of elements from an array](https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array)
- [Remove elements from an array](https://www.hostingadvice.com/how-to/javascript-remove-element-array/)
