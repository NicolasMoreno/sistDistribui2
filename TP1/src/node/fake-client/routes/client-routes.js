const express = require('express');
const router = express.Router();
const fakeClient = require('../controller');

router.get('/items/get/:user', fakeClient.getItems);
router.get('/items/add/', fakeClient.addItem);
router.get('/items/remove/', fakeClient.deleteItem);

module.exports = router;