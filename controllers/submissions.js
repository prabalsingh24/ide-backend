const Raven = require('raven');
const models = require("../models");
const services = require("../services/judge/");
const config = require('../config/config.json')[process.env.NODE_ENV || "development"]
const s3 = require('../util/s3')

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
      Raven.captureException(err)
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
      Raven.captureException(err)
      next(err);
    }
  },
  done: async (req, res, next) => {
    try {
      console.log(req.query.code)
      if (req.query.code !== config.judge.secret) {
        return res.sendStatus(403);
      }
      const { id, code, stderr, stdout, time } = req.body;

      const output = {
        id,
        stderr,
        stdout,
        code,
        time
      }

      // Upload to S3
      const result = await s3.upload(output)

      const [updated] = await models.submission.update({ 
        outputs: [result.url], 
        is_completed: true, 
        is_successful: code === 0 
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
      Raven.captureException(err)
      next(err);
    }
  }
};
