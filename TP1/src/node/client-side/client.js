const PROTO_PATH = __dirname + '/../../proto/item_services.proto';
const grpc = require('grpc');
const promise = require('promise');
const item_service = grpc.load(PROTO_PATH).itemservices;
var server = new item_service.ItemServices('localhost:50051', grpc.credentials.createInsecure());

function main() {

    // populateData();
    // getItems('Nicolas');
    // removeItem({user: 'Nicolas', item: 'Doritos'});
}
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
                    // console.log('List: ' + reply.message);
                    items.push(reply.message);
                });
                call.on('end', function () {
                    console.log("Finished listing items");
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
        server.removeItem(item, function (err, response) {
            console.log(response.message);
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
    },

    populateData: function () {
        addItem({user: 'Nicolas', item: 'Palitossh'});
        addItem({user: 'Nicolas', item: 'Doritos'});
        addItem({user: 'Nicolas', item: 'Cheddar'});
        addItem({user: 'Nicolas', item: 'Pizza'});
        addItem({user: 'Nicolas', item: 'Cerveza'});
        addItem({user: 'Nicolas', item: 'Coca-Cola'});
    }
};
// main();