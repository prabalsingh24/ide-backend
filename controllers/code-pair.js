const Raven = require('raven');
const ref = require('../util/firebase-admin')

const codePairRefs = ref.child("codePair")

module.exports = {
  create: async (req, res, next) => {
    try {
        const newCodePairRef = await codePairRefs.push()
        const codePairId = newCodePairRef.key
        res.send({
            "firebaseRefKey": codePairId
        })
    } catch (err) {
      Raven.captureException(err)
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
        const codePairId = req.body.firebaseRef;

    } catch (err) {
      Raven.captureException(err)
      next(err);
    }
  }
};
