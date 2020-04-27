const config = require('./config');

const express = require('express'),
    ioServer = require('socket.io'),
    ioClient = require('socket.io-client'),
    http = require('http'),
    router = require('./scripts/modules/router'),
    api = require('./scripts/modules/corona-api'),
    app = express(),
    server = http.createServer(app),
    ioInstance = ioServer(server);

// const externalData = ioClient('https://api.thevirustracker.com/free-api?global=stats');
// externalData.on('event occured', (event) => {
//     console.log('UPDATED!!!\n', event);
//     // console.log('Client: ', event);
//     // ioInstance.emit('server message', `SERVER: the ${event}`);
// });

const country = 'Netherlands';
const coronaDataCountry = [];
const top3Data = [];

// Routing

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))

    .get('/', (req, res) => {
        router.basicPage(res, 'home', 'Corona');
    });

ioInstance.on('connection', (socket) => {
    console.log('socket created');

    fetchAndEmitData(socket, ioInstance);

    socket.on('disconnect', () => {
        console.log(`user disconnected`);
        ioInstance.emit('server message', `SERVER: User disconnected.`);
    });
});

fetchAndEmitData = async (socket, ioInstance) => {
    const coronaData = await api.coronaData(config.countries_url);

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

    ioInstance.to(socket.id).emit('corona country data', countryData, indexOfCountry);
    ioInstance.to(socket.id).emit('corona top 3', dataTop3);
};

function isEqual(oldArray, newArray)
{
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
}

server.listen(config.port, () => {
    console.log(`Application started on port: ${config.port}`);
});
