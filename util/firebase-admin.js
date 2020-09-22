const admin = require('firebase-admin')
const config = require('../config/config.json')[process.env.NODE_ENV || "development"]
const serviceAccount = config.firebaseAdminSdk

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseDatabaseURL
});

const db = admin.database();

const ref = db.ref();

module.exports = ref;