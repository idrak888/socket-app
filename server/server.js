const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('new user connected');

	socket.emit('newMsg', {
		from: 'Admin',
		text: 'Welcome to the chat app'
	});
	socket.broadcast.emit('newMsg', {
		from: 'Admin',
		text: 'New user joined'
	});

	socket.on('disconnect', socket => {
		console.log('Disconnected');
	});
	socket.on('createMsg', (msg, callback) => {
		console.log(msg);
		io.emit('newMsg', {
			from: msg.from,
			text: msg.text
		});
		callback('sent');
	});	
});


server.listen(port, () => {
	console.log('Server started on port: ' + port);
});