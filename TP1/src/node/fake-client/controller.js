var client = require('../client-side/client');

module.exports = {
  getItems: function (req, res, next) {
      // console.log(req.body);
      client.getItems(req.params.user);
      res.send('ok');
  }

};