let userName = '';
let userItems = [];
setUserName = function() {
    userName = document.getElementsByName('name')[0].value;
    console.log('Username set = ', userName);
};

listItems = function (req, res) {
    $.ajax({
        url : "/api/items/get/" + userName,
        type: "GET",
        success: function(items){
            document.getElementById("list").remove();
            console.log('items', items);
            const list = document.createElement("ul");
            document.getElementById("items").appendChild(list);
            list.setAttribute("id", "list");
            items.forEach(function (item) {
                userItems.push(item);
                const node = document.createElement("li");
                const textnode = document.createTextNode(item);
                node.appendChild(textnode);
                document.getElementById("list").appendChild(node);
            });
        }
    });
};

addItem = function () {
    let itemName = document.getElementsByName('itemName')[0].value;
    $.ajax({
        url: "/api/items/add?"+"user="+userName+"&item="+itemName,
        type: "GET",
        success: function (item) {
            console.log("added", item);
        }
    })
};

removeItem = function () {
    let itemName = document.getElementsByName('itemName')[0].value;
    $.ajax({
        url: "/api/items/remove?"+"user="+userName+"&item="+itemName,
        type: "GET",
        success: function (res) {
            if(res.item !== undefined) {
                console.log("removed", res.item);
            } else {
                console.log(res.message)
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}