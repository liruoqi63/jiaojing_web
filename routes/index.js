var express = require('express');
var router = express.Router();
var page = require('../api/pages');

/* GET home page. */
router.get('/', page.index);
router.get('/main', page.main);
router.get('/login', page.login);

module.exports = router;
