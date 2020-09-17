var express = require('express');
var router = express.Router();
var CodePair = require('../controllers/code-pair');


router.post('/create', CodePair.create);
router.post('/delete', CodePair.delete);

module.exports = router;
