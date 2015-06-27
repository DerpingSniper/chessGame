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
turn = 0;
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
    console.log("User connect");
    socket.on('login', function (data, callback) {
        console.log("Login: " + data);
        if (data in users) {
            callback(false);
        } else if (data) {
            var pieceList = [], 
                x, y;
            for (var i = 0; i < boardArray.length; i++) {
                pieceList[i] = [];
                for (var j = 0; j < boardArray[i].length; j++) {
                    if(boardArray[i][j]) pieceList[i][j] = boardArray[i][j].color + boardArray[i][j].piece;
                }
            }
            console.log(pieceList);
            callback(pieceList);
            socket.nickname = data;
            users[socket.nickname] = socket;
            if (players[0]) {
                if (!players[1]) {
                    players[1] = socket;
                    io.sockets.emit('usernames', Object.keys(users));
                }
            } else {
                players[0] = socket;
                io.sockets.emit('usernames', Object.keys(users));
            }
        } else {
            callback(false);
        }
    });
    socket.on("move", function (data) {
        console.log("Move");
        if (players[turn] == socket) {
            var success = boardArray[data.ax][data.ay].move(data.x, data.y);
            if (success) {
                var x, y;
                for (var i = 0; i < success.length; i++) {
                    x = success[i].x;
                    y = success[i].y;
                    success[i].value = boardArray[x][y].color + boardArray[x][y].piece;
                }
                socket.emit("update", success);
                turn = Math.abs(turn - 1);
            }
        }
    });
    socket.on('disconnect', function (data) {
        if (socket.nickname) {
            delete users[socket.nickname];
            delete players[socket.nickname];
            io.sockets.emit('usernames', Object.keys(users));
        } else {
            return;
        }
    });
});