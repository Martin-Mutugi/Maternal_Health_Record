const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://maternal-health-record-5e604-default-rtdb.firebaseio.com'  // Replace with your Firebase Realtime Database URL
});

const db = admin.database();
module.exports = db;
