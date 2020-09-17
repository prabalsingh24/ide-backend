const admin = require('firebase-admin')
const config = require('../config/config.json')[process.env.NODE_ENV || "development"]
const serviceAccount = config.firebaseAdminSdk

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cd-ide-prabal-b9a4c.firebaseio.com"
})

const db = admin.database()

const ref = db.ref("codePair");

module.exports = ref