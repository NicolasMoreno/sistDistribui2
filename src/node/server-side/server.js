var PROTO_PATH = __dirname + '/../../proto/item_services.proto';
var grpc = require('grpc');
var _ = require('lodash');
var item_proto = grpc.load(PROTO_PATH).itemservices;

/**
 * List of items whishlisted from the users
 */
var items = [];

/**
 * Function that adds an item element in the item array
 */
function addItem(call,callback) {
    // console.log(call.request.item);
    items.push({user: call.request.user, item: call.request.item});
    callback(null, {message: 'added item ' + items.length});
}

/**
 * function that lists all items given the username
 */
function getItems(call,callback) {
    var userName = call.request.user;
    _.each(items, function (item) {
        if(item.user === userName){
            callback(null, item.item);
        }
    });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addProtoService(item_proto.ItemServices.service, {addItem: addItem, listItems: getItems});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

/*
function getItems(call, callback) {

}*/
