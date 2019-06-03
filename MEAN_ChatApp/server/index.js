
var express = require("express");
var socket = require("socket.io");
var app  = express();

const bodyParser = require('body-parser');
app.use(express.static("../public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/RaL',require('./api/RaL'));
app.use((req,res)=>{
    res.send('U Have Type Something Wrong...');
})

var server  = app.listen(7000,function(){
	console.log("Server Start....");
})
var io = socket(server);
var usernames = {};
var rooms = [];

io.sockets.on('connection', function (socket) {
    
    socket.on('adduser', function (data) {
        var username = data.username;
        var room = data.room;

        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            socket.join(room);
            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
            socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
        } else {
            socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }
    });
    
    socket.on('createroom', function (data) {
        var new_room = ("" + Math.random()).substring(2, 7);
        rooms.push(new_room);
        data.room = new_room;
        socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
        socket.emit('roomcreated', data);
    });

    socket.on('sendchat', function (data) {
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });

    socket.on('disconnect', function () {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        if (socket.username !== undefined) {
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);
        }
    });
});