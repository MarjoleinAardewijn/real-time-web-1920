const config = require('./config');

const express = require('express'),
    router = require('./scripts/modules/router'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

// Routing

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))

    .get('/', (req, res) => {
        router.overviewCoronaAll(res);
    });

server.listen(config.port, () => {
    console.log(`Application started on port: ${config.port}`);
});