const PROTO_PATH = __dirname + '/../../proto/item_services.proto';
const grpc = require('grpc');
const promise = require('promise');
const item_service = grpc.load(PROTO_PATH).itemservices;
var server = new item_service.ItemServices('localhost:50051', grpc.credentials.createInsecure());

module.exports = {
    /**
     * Function that calls to the server to list all the items of an specified user
     * @param user user to get all elements
     */
    getItems: function(user) {
        return new Promise(function (resolve, reject) {
            let items = [];
            if(user !== ''){
                let call = server.listItems(user);
                call.on('data', function (reply) {
                    items.push(reply.message);
                });
                call.on('end', function () {
                    resolve(items);
                });
            }else reject('No user sent');
        });
    },

    /**
     * Function that calls to the server to remove an specific item of the list.
     * @param item to remove
     */
    removeItem: function (item) {
        return new Promise(function (resolve, reject) {
            server.removeItem(item, function (err, response) {
                resolve(response.message !== "No item deleted");
            });
        });
    },

    /**
     * Function that calls to the server to add an item to the list
     * @param item to add
     */
    addItem: function (item) {
        server.addItem(item, function (err, response) {
            console.log(response.message);
        })
    }
};