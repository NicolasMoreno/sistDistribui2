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
      },

      addItem: function (req, res, next) {
          let item = {user: req.query.user, item: req.query.item};
          client.addItem(item);
          res.send(item);
      },

      deleteItem: function (req, res, next) {

      }
};