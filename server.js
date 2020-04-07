const config = require('./config');

const express = require('express'),
    router = require('./scripts/modules/router'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    customMessages = {
        '--hhry': 'Hey, how are you?',
        '--ghry': 'Good, how are you?',
        '--hry': 'How are you?',
        '--wryd': 'What are you doing?',
        '--ny': 'Nothing, you?',
        '--xo': '-xoxox-',
        '--hug': '(づ｡◕‿‿◕｡)づ',
        '--bird': '~( ‾▿‾)~',
        '--bear': 'ʕ•ᴥ•ʔ',
        '--bear-hey': 'ʕ•ᴥ•ʔっ',
        '--strong': 'ᕙ(`▿´)ᕗ',
        '--cry': '(╥﹏╥)',
        '--sending-love': '(っ◔◡◔)っ ❤',
        '--dollar': '[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]',
        '--flower-1': '❁◕ ‿ ◕❁',
        '--flower-2': '❀◕ ‿ ◕❀',
        '--flower-3': '✿◕ ‿ ◕✿',
        '--flower-l': '(✿◠‿◠)',
        '--flower-r': '(◡‿◡✿)',
        '--brr': 'O﹏o',
        '--smile': 'ヅ',
        '--concerned': 'ಠ_ಠ'
    };

// Routing

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.static('static'))

    .get('/', (req, res) => {
        router.pageWithData(res, 'home', 'Home', customMessages);
    });

// Chatroom

let numUsers = 0;

io.on('connection', (socket) => {
    let addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {

        // check if a custom messages is used
        for(let item in customMessages) {
            if (data === item) {
                // set data to be the chosen custom message
                data = customMessages[item];
                // we tell the client to execute 'new message'
                emitToUser(socket, data);
            }
        }

        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

server.listen(config.port, () => {
    console.log(`Application started on port: ${config.port}`);
});

const emitToUser = (socket, data) => {
    socket.emit('new message', {
        username: socket.username,
        message: `Send message: ${data}`
    });
};