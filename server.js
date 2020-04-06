const config = require('./config');

const express = require('express'),
    router = require('./scripts/modules/router'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http);

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))

    .get('/', (req, res) => {
        router.basicPage(res, 'home', 'Home');
    });

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(config.port, function(){
    console.log(`Application started on port: ${config.port}`);
});