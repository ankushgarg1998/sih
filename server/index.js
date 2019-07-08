require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('Jai mata di');
});


app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = { app };