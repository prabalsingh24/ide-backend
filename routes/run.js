const express = require("express");
const router = express.Router();
const passport = require("passport");
const U = require("../util/util");
const rateLimit = require("express-rate-limit");
const submissions = require("../controllers/submissions");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  keyGenerator: req => {
    return (req.user && req.user.id) || req.headers["x-real-ip"] || req.connection.remoteAddress;
  }
});

router.post("/", U.authenticateOrPass, limiter, submissions.post);
router.get("/:submission_id", submissions.get);
router.post("/cb", submissions.done);

module.exports = router;
