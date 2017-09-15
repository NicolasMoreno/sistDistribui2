var express = require('express');
var router = express.Router();
var fakeClient = require('../controller');

router.get('/items/get/:user', fakeClient.getItems);

module.exports = router;