var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

var player = require('./player.js');
var piece  = require('./newPiece.js');
console.log(piece);

//Globals
users   = {};
players = {};

server.listen(3000);

app.use(express.static(__dirname + '/img'));

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
            callback("Logged in");
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