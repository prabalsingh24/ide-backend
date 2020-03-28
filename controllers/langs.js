const Raven = require('raven');
const services = require('../services/judge/');

module.exports = {
  fetch: async (req, res, next) => {
    try {
      res.json(await services.getLangs());
    } catch (err) {
      Raven.captureException(err)
      return next(err);
    }
  },
};
