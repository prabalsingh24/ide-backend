const services = require('../services/judge/');

module.exports = {
  fetch: async (req, res, next) => {
    try {
      res.json(await services.getLangs());
    } catch (err) {
      console.log(err);

      return next(err);
    }
  },
};
