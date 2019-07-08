const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

exports.userSync = functions.database.ref('/users/{userId}')
  .onWrite((change, context) => {
    var userDoc = admin.firestore().collection('users')
      .doc(context.params.userId);
    // If this user has been deleted, delete in Firestore also
    if (!change.after.exists()) {
      return userDoc.delete();
    }
    // Get the user object with the new changes, 
    // as opposed to its value before the edit
    var userData = change.after.val();
    // Now update Firestore with that change
    return userDoc.set(userData);
});