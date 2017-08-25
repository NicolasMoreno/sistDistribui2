
const PROTO_PATH = __dirname + '/../../proto/item_services.proto';
const grpc = require('grpc');
const item_service = grpc.load(PROTO_PATH).itemservices;
const readline = require('readline'); //Tratando de hacer un user input
var client = new item_service.ItemServices('localhost:50051',
    grpc.credentials.createInsecure());

function main() {

    // populateData();
    // getItems('Nicolas');
    // removeItem({user: 'Nicolas', item: 'Doritos'});

}

/**
 * Function that calls to the server to list all the items of an specified user
 * @param user
 * @param callback
 */
function getItems(user) {
    var call = client.listItems(user);
    call.on('data', function (item) {
        console.log('List: ' + item.itemName)
    });
    call.on('end', function () {
        console.log("Finished listing items");
    })
}

/**
 * Function that calls to the server to remove an specific item of the list.
 * @param item
 */
function removeItem(item) {
    client.removeItem(item, function (err, response) {
        console.log(response.message);
    });
}

function populateData() {
    client.addItem({user: 'Nicolas', item: 'Palitossh'}, function (err, response) {
        console.log(response.message);
    });
    client.addItem({user: 'Nicolas', item: 'Doritos'}, function (err, response) {
        console.log(response.message);
    });
    client.addItem({user: 'Nicolas', item: 'Cheddar'}, function (err, response) {
        console.log(response.message);
    });
    client.addItem({user: 'Nicolas', item: 'Pizza'}, function (err, response) {
        console.log(response.message);
    });
    client.addItem({user: 'Nicolas', item: 'Cerveza'}, function (err, response) {
        console.log(response.message);
    });
    client.addItem({user: 'Nicolas', item: 'Coca-Cola'}, function (err, response) {
        console.log(response.message);
    });
}


main();