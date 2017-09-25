let userName = '';
let userItems = ['holaa', 'hola', 'haha'];

setUserName = function() {
    userName = document.getElementsByName('name')[0].value;
    console.log('Username set = ' ,userName);
};

listItems = function () {
    $.ajax({
        url : "/fake/items/get/" +userName,
        type: "GET",
        success: function(items){
            console.log('items', items);
            userItems = items;
        }
    });
};

addItem = function () {
    let itemName = document.getElementsByName('itemName')[0].value;

};