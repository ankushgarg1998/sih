var firebaseConfig = {
    apiKey: "AIzaSyBIIZCuo09f5GO9llEobSHFmhrjzF9G0Eo",
    authDomain: "wasdpollutecheck.firebaseapp.com",
    databaseURL: "https://wasdpollutecheck.firebaseio.com",
    projectId: "wasdpollutecheck",
    storageBucket: "wasdpollutecheck.appspot.com",
    messagingSenderId: "755507818839",
    appId: "1:755507818839:web:8d3f6a7d5f2c29f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('BLA');
var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});