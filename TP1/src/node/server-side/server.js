var PROTO_PATH = __dirname + '/../../proto/item_services.proto';
var grpc = require('grpc');
var _ = require('lodash');
var routeguide = grpc.load(PROTO_PATH).itemservices;

/**
 * List of items whishlisted from the users
 */
var items = [
    {user: 'Nicolas', item: 'Palitossh'},
    {user: 'Nicolas', item: 'Doritos'},
    {user: 'Nicolas', item: 'Cheddar'},
    {user: 'Nicolas', item: 'Cerveza'},
    {user: 'Nicolas', item: 'Pizza'},
    {user: 'Nicolas', item: 'Coca-cola'},
    {user: 'Pepe', item: 'Doritos'},
    {user: 'Pepe', item: 'Cheddar'},
    {user: 'Pepa', item: 'Palitossh'},
    {user: 'Pepa', item: 'Cerveza'}
];


/**
 * Function that adds an item element in the item array
 */
function addItem(call,callback) {
    items.push({user: call.request.user, item: call.request.item});
    callback(null, {message: 'added item ' + items.length});
}

/**
 * function that lists all items given the username
 */
function getItems(call) {
    console.log("estoy en el server");
    var userName = call.request.user;
    _.each(items, function (item) {
        if(item.user === userName){
            call.write(item.item);
        }
    });
    call.end();
}

/**
 * Function that removes an item given the Item.
 */
function removeItem(call, callback) {
    const item = {user: call.request.user, item: call.request.item};
    var auxItemArray = items;
    items = items.filter( function (innerItem) {
        return !(innerItem.user === item.user && innerItem.item === item.item);
    });
    if(items === auxItemArray){
       callback(null, {message: "No item deleted"});
    }else callback(null, {message: "Item deleted successfully = " + item.item});

}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function getServer() {
    var server = new grpc.Server();
    server.addProtoService(routeguide.ItemServices.service, {
        addItem: addItem,
        listItems: getItems,
        removeItem: removeItem
    });
    return server;
}
var routeServer = getServer();
routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
routeServer.start();