
const PROTO_PATH = __dirname + '/../../proto/item_services.proto';
const grpc = require('grpc');
const item_service = grpc.load(PROTO_PATH).itemservices;
const readline = require('readline'); //Tratando de hacer un user input
var client = new item_service.ItemServices('localhost:50051',
    grpc.credentials.createInsecure());

function main() {

    client.addItem({user: 'Nicolas', item: 'kemepasa'}, function (err, response) {
        console.log(response.message);
    });
    client.listItems('Nicolas', function (err, response) {
        console.log('list: ' + response.itemName);
    });
}

function getItems(user, callback) {
    client.listItems({user: user}, callback);
}

main();