var socket = io();

socket.on('connect', function() {
	console.log('Connected');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMsg', function(msg) {
	console.log(msg);
});

