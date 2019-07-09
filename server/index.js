const firebaseConfig = require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var firebase = require('firebase');

var app = express();
app.use(bodyParser.json());
const port = process.env.PORT;


var firebaseApp = firebase.initializeApp(firebaseConfig.firebaseConfig); 


var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});




app.get('/', (req, res) => {
    console.log('Jai mata di');
    res.sendFile(path.join(__dirname + '/index.html'));
});




app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = { app };