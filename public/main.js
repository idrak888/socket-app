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
	let params = jQuery.deparam(window.location.search);

	socket.emit('join', params, (err) => {
		if (err) {
			alert(err);
			window.location.href = '/';
		}else {
			console.log('No error');
		}
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMsg', function(msg) {
	var time = moment(msg.createdAt).format('h:mm a');
	const messages = document.getElementById('messages');
	
	var msgTemplate = $('#msg-template').html();

	var html = Mustache.render(msgTemplate, {
		text: msg.text,
		from: msg.from,
		time: time
	});
	var li = document.createElement('li');
	li.innerHTML = html;

	messages.appendChild(li);

});

socket.on('generateLocationMsg', function(data) {
	const messages = document.getElementById('messages');
	var time = moment(data.createdAt).format('h:mm a');
	var url = `https://www.google.com/maps?q=${data.lat},${data.long}`;

	var msgTemplate = $('#location-msg-template').html();
	var html = Mustache.render(msgTemplate, {
		url: url,
		from: data.from,
		time: time
	});

	var li = document.createElement('li');
	li.innerHTML = html;
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