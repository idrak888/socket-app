const form = document.getElementById('form');
var socket = io();

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const msg = document.getElementById('msg');
	socket.emit('createMsg', {
		from: 'User',
		text: msg.value
	}, function (data) {
		console.log(data);
	});

	msg.value = '';
});

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

socket.on('generateLocationMsg', function(data) {
	const messages = document.getElementById('messages');
	var li = document.createElement('li');
	var a = document.createElement('a');
	var url = `https://www.google.com/maps?q=${data.lat},${data.long}`;
	a.innerHTML = 'My location';
	li.innerHTML = data.from + ': ';
	a.href = url;
	a.target = '_blank';
	li.appendChild(a);
	messages.appendChild(li);
	
});

var locationBtn = document.querySelector('.sendLocation');

locationBtn.addEventListener('click', e => {
	e.target.disabled = true;
	e.target.innerHTML = 'Sending...'

	navigator.geolocation.getCurrentPosition((position) => {
		e.target.disabled = false;
		e.target.innerHTML = 'Send location';
		socket.emit('createLocationMsg', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});	
	});
});