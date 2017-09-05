const PROTO_PATH = __dirname + '/../../proto/item_services.proto';
const grpc = require('grpc');
const item_service = grpc.load(PROTO_PATH).itemservices;
var server = new item_service.ItemServices('localhost:50051',
    grpc.credentials.createInsecure());

const express = require('express');
const app = express();
app.set('views', './client-side/views');
app.set('view engine', 'pug');

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
    var call = server.listItems(user);
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
    server.removeItem(item, function (err, response) {
        console.log(response.message);
    });
}

/**
 * Function that calls to the server to add an item to the list
 * @param item to add
 */
function addItem(item) {
    server.addItem(item, function (err, response) {
        console.log(response.message);
    })
}

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!', add : addItem})
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

function populateData() {
    addItem({user: 'Nicolas', item: 'Palitossh'});
    addItem({user: 'Nicolas', item: 'Doritos'});
    addItem({user: 'Nicolas', item: 'Cheddar'});
    addItem({user: 'Nicolas', item: 'Pizza'});
    addItem({user: 'Nicolas', item: 'Cerveza'});
    addItem({user: 'Nicolas', item: 'Coca-Cola'});
}

main();