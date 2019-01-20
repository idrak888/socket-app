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

	socket.on('disconnect', socket => {
		console.log('Disconnected');
	});

	socket.emit('newEmail', {
		from: 'email@gmail.com',
		text: 'wazzap'
	});

	socket.on('createEmail', newEmail => {
		console.log(newEmail);
	});

	socket.on('createMsg', msg => {
		console.log(msg);
		io.emit('newMsg', {
			from: msg.from,
			text: msg.text
		});
	});	
});


server.listen(port, () => {
	console.log('Server started on port: ' + port);
});