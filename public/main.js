var socket = io();

socket.on('connect', function() {
	console.log('Connected');
	socket.emit('createEmail', {
		to: 'someone@gmail.com',
		text: 'ayy'
	});
	socket.emit('createMsg', {
		from: 'Idrak mustahsin',
		text: 'Ayy',
		createdAt: 123
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
	console.log('New email', email);
});

socket.on('newMsg', function(msg) {
	console.log(msg);
});

