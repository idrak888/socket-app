const express = require('express');
const path = require('path');

var app = express();

var port = process.env.PORT || 3000;

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log('Server started on port: ' + port);
});