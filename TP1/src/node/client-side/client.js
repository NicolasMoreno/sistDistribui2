
const PROTO_PATH = __dirname + '/../../proto/item_services.proto';
const grpc = require('grpc');
const item_service = grpc.load(PROTO_PATH).itemservices;
const readline = require('readline'); //Tratando de hacer un user input
var client = new item_service.ItemServices('localhost:50051',
    grpc.credentials.createInsecure());

var userName; // Save the username on memory.

function main() {


    // populateData();
    // getItems('Nicolas');
    // removeItem({user: 'Nicolas', item: 'Doritos'});
}

/**
 * Function that calls to the server to list all the items of an specified user
 * @param user user to get all elements
 */
function getItems(user) {
    var call = client.listItems(user);
    call.on('data', function (reply) {
        console.log('List: ' + reply.message)
    });
    call.on('end', function () {
        console.log("Finished listing items");
    })
}

/**
 * Function that calls to the server to remove an specific item of the list.
 * @param item to remove
 */
function removeItem(item) {
    client.removeItem(item, function (err, response) {
        console.log(response.message);
    });
}

/**
 * Function that calls to the server to add an item to the list
 * @param item to add
 */
function addItem(item) {
    client.addItem(item, function (err, response) {
        console.log(response.message);
    })
}


function populateData() {
    addItem({user: 'Nicolas', item: 'Palitossh'});
    addItem({user: 'Nicolas', item: 'Doritos'});
    addItem({user: 'Nicolas', item: 'Cheddar'});
    addItem({user: 'Nicolas', item: 'Pizza'});
    addItem({user: 'Nicolas', item: 'Cerveza'});
    addItem({user: 'Nicolas', item: 'Coca-Cola'});
}


main();