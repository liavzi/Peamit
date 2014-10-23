var serverActor = require("./serverActor");
var testUtils = {
    randomInt : function (low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    },
    createProductObject : function(name){
        return {
            _id : this.randomInt(1,500000),
            name : name

        };
    },
    createProduct : function(name,callback){
        var product = this.createProductObject(name);
        serverActor.productService.put(product,callback);
    }
}
module.exports = testUtils;