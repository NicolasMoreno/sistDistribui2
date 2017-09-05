const PROTO_PATH = '/Users/jeronimocarlos/sandbox/sistDistribui2/TP1/src/proto/item_services.proto';
const grpc = require('grpc');
const item_service = grpc.load(PROTO_PATH).itemservices;
var server = new item_service.ItemServices('localhost:50051',
    grpc.credentials.createInsecure());

function otherAddNow() {
    var item = {user: 'Nicolas', item: 'Palitoh'};
    server.addItem(item, function (err, response) {
        console.log(response.message);
    });
    console.log(item)
}
addNow = function () {
    var item = {user: 'Nicolas', item: 'Palitoh'};
    server.addItem(item, function (err, response) {
        console.log(response.message);
    });
    console.log(item)
    //llama 2 veces add(user) por alguna puta razon y cuando le doy click no lo hace
};