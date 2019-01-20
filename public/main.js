const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const msg = document.getElementById('msg');
	socket.emit('createMsg', {
		from: 'User',
		text: msg.value
	}, function (data) {
		console.log(data);
	});
});

var socket = io();

socket.on('connect', function() {
	console.log('Connected');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMsg', function(msg) {
	const messages = document.getElementById('messages');
	var li = document.createElement('li');
	li.innerHTML = msg.from + ': ' + msg.text;
	messages.appendChild(li);
});
