var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var fs      = require('fs');
var player  = require('./player.js');

//Globals
users    = {};
players  = {};
boardObj = [];
MAP_FILE = "board.json";

fs.readFile(MAP_FILE, 'utf8', function(err, data) {
    if(err) {
        return console.log(err);
    }
    boardObj = JSON.parse(data);
});

server.listen(3000);

app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/js'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    console.log("Connected");
    socket.on('login', function(data, callback){
        console.log("Login Attempt: " + data);
        if(data in users) {
            callback(false);
        } else if(data) {
            callback(boardObj);
            socket.nickname = data;
            users[socket.nickname] = socket;
            players[socket.nickname] = new player(socket.nickname);
            io.sockets.emit('usernames', Object.keys(users));
        } else {
            callback(false);
        }
    });
    socket.on('disconnect', function(data) {
        if(socket.nickname) {
            delete users[socket.nickname];
            delete players[socket.nickname];
            io.sockets.emit('usernames', Object.keys(users));
        } else {
            return;
        }
    });
});