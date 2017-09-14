var express = require('express');
var router = express.Router();
var fakeClient = require('../controller');

router.post('/items/get', fakeClient.getItems);

module.exports = router;