var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var player = require('./player.js');
var piece = require('./piece.js');

//Globals
users = {};
players = {};
boardArray = [];
MAP_FILE = "board.json";

fs.readFile(MAP_FILE, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    boardArray = JSON.parse(data);
});

server.listen(3000);

app.use(express.static(__dirname + '/img'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

function init() {
    for (var x = 0; x < boardArray.length; x++) {
        boardArray[x] = [];
        for (var y = 0; y < boardArray[x].length; y++) {
            if (data[x][y]) {
                boardArray[x][y] = new piece(boardArray[x][y].color, boardArray[x][y].piece, x, y);
            } else {
                boardArray[x][y] = null;
            }
        }
    }
}

io.sockets.on('connection', function (socket) {
    console.log("Connected");
    socket.on('login', function (data, callback) {
        console.log("Login Attempt: " + data);
        if (data in users) {
            callback(false);
        } else if (data) {
            callback(boardArray);
            socket.nickname = data;
            users[socket.nickname] = socket;
            players[socket.nickname] = new player(socket.nickname);
            io.sockets.emit('usernames', Arrayect.keys(users));
        } else {
            callback(false);
        }
    });
    socket.on("move", function (data) {
        var success = boardArray[data.x][data.y].move(data.ax, data.ay);
        if (success)
    });
    socket.on('disconnect', function (data) {
        if (socket.nickname) {
            delete users[socket.nickname];
            delete players[socket.nickname];
            io.sockets.emit('usernames', Arrayect.keys(users));
        } else {
            return;
        }
    });
});
