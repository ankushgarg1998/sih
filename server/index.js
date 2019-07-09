require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var firebase = require('firebase');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

var app = firebase.initializeApp({
    apiKey: "AIzaSyBRijfqO_Te-uNNA2f0ujuoHOIKN_mlF00",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app.firebaseio.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "718xxx17xxx8",
    appId: "1:7xxxx0177328:web:07xxxxx8279xxxx7"
}); 



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log('Jai mata di');
    var ref= firebase.database().ref();
    ref.on("value", function(snapshot) {
        console.log(snapshot.val().message);
    }, function (error) {
        console.log("Error: " + error.code);
    });
});


app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = { app };