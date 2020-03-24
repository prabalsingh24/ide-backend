const models = require("../models");
const services = require("../services/judge/");

module.exports = {
  post: async (req, res, next) => {
    try {
      const { source, lang, input } = req.body;
      if (!source) return res.status(400).send({ error: { message: "source is required" } });
      if (!lang) return res.status(400).send({ error: { message: "lang is required" } });

      const { id } = await services.runCode({ source, lang, input });

      await models.submission.create({ 
        judge_id: id, 
        user_id: req.user && req.user.id 
      });

      res.send({ id });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const submission = await models.submission.findOne({ 
        where: {
          judge_id: req.params.submission_id
        } 
      });

      if (!submission) {
        return res.status(404).send({ error: { message: "Submission not found." } });
      }

      res.send(submission);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  done: async (req, res, next) => {
    try {
      const { id, code, outputs } = req.body;

      const [updated] = await models.submission.update({ 
        outputs, 
        is_completed: true, 
        is_successful: code === 200 
      }, {
        where: { 
          judge_id: id, 
          is_completed: false 
        }
      });

      if (!updated) {
        return res.status(404).send({ error: { message: "Submission not found." } });
      }

      return res.send({ success: true });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};
