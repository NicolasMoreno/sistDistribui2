var client = require('../client-side/client');

module.exports = {
  getItems: function (req, res, next) {
      client.getItems(req.params.user)
          .then(
              items => {
                  res.send(items);
              }
          ).catch(
              error =>{
                  console.log(error);
              })
  }

};