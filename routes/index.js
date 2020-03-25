const express = require('express');
const router = express.Router();
const UsersUtil = require('../controllers/users');
const langs = require('../controllers/langs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.route('/logout').get(UsersUtil.logout);

router.route('/login').get(UsersUtil.login);

router.route('/langs').get(langs.fetch);

module.exports = router;
