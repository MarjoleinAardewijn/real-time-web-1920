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

![App Home](https://user-images.githubusercontent.com/23479038/78683379-7ee9f480-78ef-11ea-9c2c-ec378e58d709.png "App Home")

## Description

This app shows on one side the data related to the corona virus and on the other side positive tweets with hashtags like #Daslief, which is from a campaign from [SIRE](https://sire.nl/campagne-overzicht/jaren/20/items).
The idea behind this app is to show people even though it's all very difficult right now, we help each other more than EVER BEFORE and that there are still a lot of positive things happening in the world.

## Table of Contents

* [To Do](#To-do)
* [Installation](#Installation)
  * [Development](#Development)
  * [Production](#Production)
* [How it works](#How-it-works)
  * [Data Life Cycle Diagram](#Data-Life-Cycle-Diagram)
* [API](#Api)
* [Feature Wishlist](#Feature-Wishlist)
* [Sources](#Sources)
* [Credits](#Credits)

## To do

- [x] Request API Key Twitter API
- [x] Get Corona Data
- [ ] Show Real Time Data using Socket.IO

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

## How it works
### Data Life Cycle Diagram

![Data Life Cycle Diagram](https://user-images.githubusercontent.com/23479038/79784432-83c49480-8342-11ea-8a30-4a9070e67392.jpg "Data Life Cycle Diagram")

## API

For this app I used 2 API's:
- [Track Corona API](https://www.trackcorona.live/)
- [Twitter API](https://www.npmjs.com/package/twitter)

### Track Corona

For getting the Corona data I used the following API endpoint:

> https://www.trackcorona.live/api/countries

This will be returning the following data:

<details>
  <summary>Json Data</summary>

```json
{ code: 200,
   data:
    [ { location: 'Spain',
        country_code: 'es',
        latitude: 40.463667,
        longitude: -3.74922,
        confirmed: 200210,
        dead: 20852,
        recovered: 80587,
        updated: '2020-04-20 18:00:12.333812+00:00' },
      { location: 'Iran',
        country_code: 'ir',
        latitude: 32.427908,
        longitude: 53.688046,
        confirmed: 83505,
        dead: 5209,
        recovered: 59273,
        updated: '2020-04-20 18:00:12.742096+00:00' },
      { location: 'Madagascar',
        country_code: 'mg',
        latitude: -18.766947,
        longitude: 46.869107,
        confirmed: 121,
        dead: 0,
        recovered: 41,
        updated: '2020-04-20 18:00:20.943783+00:00' },
      { location: 'Qatar',
        country_code: 'qa',
        latitude: 25.354826,
        longitude: 51.183884,
        confirmed: 6015,
        dead: 9,
        recovered: 555,
        updated: '2020-04-20 18:00:14.742716+00:00' },
      ...
    ]
}
```
</details>

### Twitter API

For getting tweets from specific hashtags I used the following API endpoint:

> https://api.twitter.com/1.1/search/tweets.json?q=%23daslief&result_type=recent

This will be returning the following data:

<details>
  <summary>Json Data</summary>

```json
{
	"results": [
		{
			"created_at": "Fri Nov 02 17:18:31 +0000 2018",
			"id": 1058408022936977409,
			"id_str": "1058408022936977409",
			"text": "RT @harmophone: \"The innovative crowdsourcing that the Tagboard, Twitter and TEGNA collaboration enables is surfacing locally relevant conv…",
			"source": "<a href=\"http:\/\/twitter.com\" rel=\"nofollow\">Twitter Web Client<\/a>",
			"truncated": false,
			"in_reply_to_status_id": null,
			"in_reply_to_status_id_str": null,
			"in_reply_to_user_id": null,
			"in_reply_to_user_id_str": null,
			"in_reply_to_screen_name": null,
			"user": {
				"id": 2244994945,
				"id_str": "2244994945",
				"name": "Twitter Dev",
				"screen_name": "TwitterDev",
				"location": "Internet",
				"url": "https:\/\/developer.twitter.com\/",
				"description": "Your official source for Twitter Platform news, updates & events. Need technical help? Visit https:\/\/twittercommunity.com\/ ⌨️ #TapIntoTwitter",
				"translator_type": "null",
				"protected": false,
				"verified": true,
				"followers_count": 503828,
				"friends_count": 1477,
				"listed_count": 1437,
				"favourites_count": 2199,
				"statuses_count": 3380,
				"created_at": "Sat Dec 14 04:35:55 +0000 2013",
				"utc_offset": null,
				"time_zone": null,
				"geo_enabled": true,
				"lang": "en",
				"contributors_enabled": false,
				"is_translator": false,
				"profile_background_color": "null",
				"profile_background_image_url": "null",
				"profile_background_image_url_https": "null",
				"profile_background_tile": null,
				"profile_link_color": "null",
				"profile_sidebar_border_color": "null",
				"profile_sidebar_fill_color": "null",
				"profile_text_color": "null",
				"profile_use_background_image": null,
				"profile_image_url": "null",
				"profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/880136122604507136\/xHrnqf1T_normal.jpg",
				"profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/2244994945\/1498675817",
				"default_profile": false,
				"default_profile_image": false,
				"following": null,
				"follow_request_sent": null,
				"notifications": null
			},
			"geo": null,
			"coordinates": null,
			"place": null,
			"contributors": null,
			"retweeted_status": {
				"created_at": "Tue Oct 30 21:30:25 +0000 2018",
				"id": 1057384253116289025,
				"id_str": "1057384253116289025",
				"text": "\"The innovative crowdsourcing that the Tagboard, Twitter and TEGNA collaboration enables is surfacing locally relev… https:\/\/t.co\/w46U5TRTzQ",
				"source": "<a href=\"http:\/\/twitter.com\" rel=\"nofollow\">Twitter Web Client<\/a>",
				"truncated": true,
				"in_reply_to_status_id": null,
				"in_reply_to_status_id_str": null,
				"in_reply_to_user_id": null,
				"in_reply_to_user_id_str": null,
				"in_reply_to_screen_name": null,
				"user": {
					"id": 175187944,
					"id_str": "175187944",
					"name": "Tyler Singletary",
					"screen_name": "harmophone",
					"location": "San Francisco, CA",
					"url": "http:\/\/medium.com\/@harmophone",
					"description": "SVP Product at @Tagboard. Did some Data, biz, and product @Klout & for @LithiumTech; @BBI board member; @Insightpool advisor. World's worst whiteboarder.",
					"translator_type": "null",
					"protected": false,
					"verified": false,
					"followers_count": 1982,
					"friends_count": 1877,
					"listed_count": 245,
					"favourites_count": 23743,
					"statuses_count": 12708,
					"created_at": "Thu Aug 05 22:59:29 +0000 2010",
					"utc_offset": null,
					"time_zone": null,
					"geo_enabled": false,
					"lang": "en",
					"contributors_enabled": false,
					"is_translator": false,
					"profile_background_color": "null",
					"profile_background_image_url": "null",
					"profile_background_image_url_https": "null",
					"profile_background_tile": null,
					"profile_link_color": "null",
					"profile_sidebar_border_color": "null",
					"profile_sidebar_fill_color": "null",
					"profile_text_color": "null",
					"profile_use_background_image": null,
					"profile_image_url": "null",
					"profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/719985428632240128\/WYFHcK-m_normal.jpg",
					"profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/175187944\/1398653841",
					"default_profile": false,
					"default_profile_image": false,
					"following": null,
					"follow_request_sent": null,
					"notifications": null
				},
				"geo": null,
				"coordinates": null,
				"place": null,
				"contributors": null,
				"is_quote_status": false,
				"extended_tweet": {
					"full_text": "\"The innovative crowdsourcing that the Tagboard, Twitter and TEGNA collaboration enables is surfacing locally relevant conversations in real-time and enabling voters to ask questions during debates,”  -- @adamostrow, @TEGNA\nLearn More: https:\/\/t.co\/ivAFtanfje",
					"display_text_range": [
						0,
						259
					],
					"entities": {
						"hashtags": [],
						"urls": [
							{
								"url": "https:\/\/t.co\/ivAFtanfje",
								"expanded_url": "https:\/\/blog.tagboard.com\/twitter-and-tagboard-collaborate-to-bring-best-election-content-to-news-outlets-with-tagboard-e85fc864bcf4",
								"display_url": "blog.tagboard.com\/twitter-and-ta…",
								"unwound": {
									"url": "https:\/\/blog.tagboard.com\/twitter-and-tagboard-collaborate-to-bring-best-election-content-to-news-outlets-with-tagboard-e85fc864bcf4",
									"status": 200,
									"title": "Twitter and Tagboard Collaborate to Bring Best Election Content to News Outlets With Tagboard…",
									"description": "By Tyler Singletary, Head of Product, Tagboard"
								},
								"indices": [
									236,
									259
								]
							}
						],
						"user_mentions": [
							{
								"screen_name": "adamostrow",
								"name": "Adam Ostrow",
								"id": 5695942,
								"id_str": "5695942",
								"indices": [
									204,
									215
								]
							},
							{
								"screen_name": "TEGNA",
								"name": "TEGNA",
								"id": 34123003,
								"id_str": "34123003",
								"indices": [
									217,
									223
								]
							}
						],
						"symbols": []
					}
				},
				"quote_count": 0,
				"reply_count": 1,
				"retweet_count": 6,
				"favorite_count": 19,
				"entities": {
					"hashtags": [],
					"urls": [
						{
							"url": "https:\/\/t.co\/w46U5TRTzQ",
							"expanded_url": "https:\/\/twitter.com\/i\/web\/status\/1057384253116289025",
							"display_url": "twitter.com\/i\/web\/status\/1…",
							"indices": [
								117,
								140
							]
						}
					],
					"user_mentions": [],
					"symbols": []
				},
				"favorited": false,
				"retweeted": false,
				"possibly_sensitive": false,
				"filter_level": "low",
				"lang": "en"
			},
			"is_quote_status": false,
			"quote_count": 0,
			"reply_count": 0,
			"retweet_count": 0,
			"favorite_count": 0,
			"entities": {
				"hashtags": [],
				"urls": [],
				"user_mentions": [
					{
						"screen_name": "harmophone",
						"name": "Tyler Singletary",
						"id": 175187944,
						"id_str": "175187944",
						"indices": [
							3,
							14
						]
					}
				],
				"symbols": []
			},
			"favorited": false,
			"retweeted": false,
			"filter_level": "low",
			"lang": "en",
			"matching_rules": [
				{
					"tag": null
				}
			]
		}
	],
	"requestParameters": {
		"maxResults": 100,
		"fromDate": "201811010000",
		"toDate": "201811060000"
	}
}
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
- [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

## Credits

...
