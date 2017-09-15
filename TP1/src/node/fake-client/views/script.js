addNow = function () {
    $.ajax({
        url : "/fake/items/get/Nicolas",
        type: "GET",
        success: function(){
            console.log("Pure jQuery Pure JS object");
        }
    });
};