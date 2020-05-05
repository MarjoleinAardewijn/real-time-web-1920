const config = require('./config');

const express = require('express'),
    ioServer = require('socket.io'),
    http = require('http'),
    router = require('./js/modules/router'),
    coronaApi = require('./js/modules/corona-api'),
    twitterApi = require('./js/modules/twitter-api'),
    app = express(),
    server = http.createServer(app),
    ioInstance = ioServer(server),
    twitterClientStream = twitterApi.twitterConfig(),
    twitterClient = twitterApi.twitterConfig();

// Variables

const defaultHashtag = '#daslief',
    defaultCountry = 'Netherlands',
    coronaDataCountry = [],
    top3Data = [],
    historyLenght = 10;
let tweetsLog = [],
    sortedTweets = [],
    hashtag = '#daslief';

// Routing

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))

    .get('/', async (req, res) => {
        router.overviewCoronaAll(res);
    });

// Sockets

ioInstance.on('connection', (socket) => {
    console.log('socket created');

    fetchAndEmitCoronaData(socket, ioInstance);

    socket.on('get another country', async (data) => {
        const countryData = await getCountry(data),
            index = await findIndexOfCountry(data);

        ioInstance.to(socket.id).emit('get another country', countryData, index);
    });

    twitterClient.get('search/tweets', {q: defaultHashtag}, (error, tweets, response) => {
        filterAndSortTweets(tweets);
        hashtag = defaultHashtag;
        ioInstance.to(socket.id).emit('get tweets', sortedTweets);
    });

    socket.on('change hashtag', (data) => {
        twitterClient.get('search/tweets', {q: data}, (error, tweets, response) => {
            filterAndSortTweets(tweets);
            hashtag = data;
            ioInstance.to(socket.id).emit('change hashtag', sortedTweets);
        });
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
});

// Streaming Tweets

twitterClientStream.stream('statuses/filter', {track: hashtag}, (stream) => {
    stream.on('data', function(event) {
        console.log(event);
        if(!event.text.match(/\bRT /gi)) { // check if tweet is not a retweet.
            if(sortedTweets.length >= historyLenght) { // check if the array is bigger than the history length.
                sortedTweets.pop(); // remove last tweet of the array.
                sortedTweets.unshift(event); // add tweet to the beginning of the array.
            } else {
                sortedTweets.unshift(event);
            }

            ioInstance.emit('new tweet', event);
        }
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});

// helper methods Tweets

/**
 * Method to filter all the retweets from the array and add normal tweets to the array tweetsLog.
 * @param data -> tweets
 * @returns {*}
 */
const filterTweets = (data) => {
    tweetsLog.length = 0;
    return data.statuses.map(item => {
        let retweet = item.text.match(/\bRT /gi);
        if(!retweet) {
            if(tweetsLog.length >= historyLenght) { // prevent the array from getting bigger than the history length.
                tweetsLog.pop();
                tweetsLog.unshift(item);
            } else {
                tweetsLog.push(item);
            }
        }
    });
};

/**
 * Method to sort all the tweets in the array 'tweetsLog' on date.
 */
const sortTweets = () => {
    sortedTweets = tweetsLog.sort((a, b) => {
        // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
    });
    sortedTweets.filter((item, i) => i < historyLenght);
};

/**
 * Method to filter and sort tweets.
 * @param data
 */
const filterAndSortTweets = (data) => {
    filterTweets(data);
    sortTweets();
};

// helper methods Corona

/**
 * Method to fetch the corona data.
 * @returns {Promise<*>}
 */
const fetchCoronaData = async () => {
    const coronaData = await coronaApi.coronaData(config.countries_url);
    return coronaData;
};

/**
 * Method to sort the corona data.
 * @returns {Promise<this | this | this | this | this | this | this | this | this | this | this | this | void>}
 */
const sortCoronaData = async () => {
    const coronaData = await fetchCoronaData(),
        sortedData = coronaData.sort((a, b) => b.confirmed - a.confirmed);

    return sortedData;
};

/**
 * Method to get the data of a specific country.
 * @param country
 * @returns {Promise<*>}
 */
const getCountry = async (country) => {
    const sortedData = await sortCoronaData(),
        countryData = sortedData.filter(item => {
        return item.location === country;
    });

    return countryData;
};

/**
 * Method to get the top 3 of confirmed corona cases.
 * @returns {Promise<*>}
 */
const getTop3Countries = async () => {
    const sortedData = await sortCoronaData(),
        dataTop3 = sortedData.slice(0, 3);

    return dataTop3;
};

/**
 * Method to find the index of a country.
 * @param country
 * @returns {Promise<number>}
 */
const findIndexOfCountry = async (country) => {
    const sortedData = await sortCoronaData(),
        findIndexOfCountry = sortedData.findIndex(item => {
            return item.location === country;
        }),
        indexOfCountry = findIndexOfCountry + 1;

    return indexOfCountry;
};

/**
 * Method to fetch and emit corona data.
 * @param socket
 * @param ioInstance
 * @returns {Promise<void>}
 */
const fetchAndEmitCoronaData = async (socket, ioInstance) => {
    const top3 = await getTop3Countries(),
        index = await findIndexOfCountry(defaultCountry),
        countryData = await getCountry(defaultCountry);


    // check if country data is updated or not
    if(coronaDataCountry.length === 0) {
        coronaDataCountry.push(countryData[0]); // add data to array
    } else if(coronaDataCountry[0].updated !== countryData[0].updated) {
        coronaDataCountry.length = 0; // empty array
        coronaDataCountry.push(countryData[0]); // add updated data to array
    }

    // check if top 3 data is updated or not
    if(isEqual(top3Data, top3) === false) {
        top3Data.length = 0;
        top3Data.push(top3[0], top3[1], top3[2]);
    }

    ioInstance.emit('corona country data', countryData, index);
    ioInstance.emit('corona top 3', top3);
};

/**
 * Method to check if elements in an array are the same depending on the updated time and location.
 * @param oldArray
 * @param newArray
 * @returns {boolean}
 */
const isEqual = (oldArray, newArray) => {
    // if length is not equal
    if(oldArray.length !== newArray.length)
        return false;
    else
    {
        // comapring each element of array
        for(let i = 0; i < oldArray.length; i++)
            if(oldArray[i].updated !== newArray[i].updated && oldArray[i].location !== newArray[i].location)
                return false;
        return true;
    }
};

server.listen(config.port, () => {
    console.log(`Application started on port: ${config.port}`);
});
