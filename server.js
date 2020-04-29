const config = require('./config');

const express = require('express'),
    ioServer = require('socket.io'),
    http = require('http'),
    router = require('./scripts/modules/router'),
    coronaApi = require('./scripts/modules/corona-api'),
    twitterApi = require('./scripts/modules/twitter-api'),
    app = express(),
    server = http.createServer(app),
    ioInstance = ioServer(server),
    twitterClientStream = twitterApi.twitterConfig(),
    twitterClient = twitterApi.twitterConfig();

// Variables

const hashtag = '#daslief',
    country = 'Netherlands',
    coronaDataCountry = [],
    top3Data = [],
    historyLenght = 10;
let tweetsLog = [],
    sortedTweets = [];

// Streaming Tweets

twitterClientStream.stream('statuses/filter', {track: hashtag}, (stream) => {
    stream.on('data', function(event) {
        console.log(event);
        if(!event.text.match(/\bRT /gi)) {
            sortedTweets.pop();
            sortedTweets.unshift(event);
            console.log(sortedTweets);
            ioInstance.emit('new tweet', event);
        }
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});

// Routing

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))

    .get('/', (req, res) => {
        router.basicPage(res, 'home', 'Corona');
    });

// Sockets

ioInstance.on('connection', (socket) => {
    console.log('socket created');

    fetchAndEmitCoronaData(socket, ioInstance);

    twitterClient.get('search/tweets', {q: hashtag}, (error, tweets, response) => {
        filterAndSortTweets(tweets);
        ioInstance.to(socket.id).emit('tweets', sortedTweets);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
    });
});

const filterTweets = (data) => {
    tweetsLog.length = 0;
    return data.statuses.map(item => {
        let retweet = item.text.match(/\bRT /gi);
        if(!retweet) {
            tweetsLog.push(item);
        }
    });
};

const sortTweets = () => {
    sortedTweets = tweetsLog.sort((a, b) => {
        // Turn your strings into dates, and then subtract them to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
    });
    sortedTweets.filter((month,idx) => idx < historyLenght);
};

const filterAndSortTweets = (data) => {
    filterTweets(data);
    sortTweets();
};

const fetchAndEmitCoronaData = async (socket, ioInstance) => {
        const coronaData = await coronaApi.coronaData(config.countries_url);

        const sortedData = coronaData.sort((a, b) => b.confirmed - a.confirmed),
            dataTop3 = sortedData.slice(0, 3),
            countryData = sortedData.filter(item => {
                return item.location === country;
            }),
            findIndexOfCountry = sortedData.findIndex(item => {
                return item.location === country;
            }),
            indexOfCountry = findIndexOfCountry + 1;

        // check if country data is updated or not
        if(coronaDataCountry.length === 0) {
            coronaDataCountry.push(countryData[0]); // add data to array
        } else if(coronaDataCountry[0].updated !== countryData[0].updated) {
            coronaDataCountry.length = 0; // empty array
            coronaDataCountry.push(countryData[0]); // add updated data to array
        }

        // check if top 3 data is updated or not
        if(isEqual(top3Data, dataTop3) === false) {
            top3Data.length = 0;
            top3Data.push(dataTop3[0], dataTop3[1], dataTop3[2]);
        }

        ioInstance.emit('corona country data', countryData, indexOfCountry);
        ioInstance.emit('corona top 3', dataTop3);
    },

    isEqual = (oldArray, newArray) => {
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
