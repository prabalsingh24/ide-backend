const Raven = require('raven');
const ref = require('../util/firebase-admin');

const codePairRefs = ref.child("codePair");

module.exports = {
  create: async (req, res, next) => {
    try {
        const newCodePairRef = await codePairRefs.push({
          "tempKey": "tempKey"      // not able to create empty object, hence adding random key
        });
        const codePairKey = newCodePairRef.key;
        res.json({
            "firebaseRefKey": codePairKey
        })
    } catch (err) {
      Raven.captureException(err);
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
        const key = req.body.firebaseRefKey;
        const codePairRef = codePairRefs.child(key);
        await codePairRef.remove();
        res.json({status: 'ok'});
    } catch (err) {
      Raven.captureException(err);
      next(err);
    }
  }
};
