var chai = require("chai");
var expect = chai.expect;
var serverActor = require("./framework/serverActor");
var async = require("async");

describe('productForSellingServiceShould', function(){
    it('should update existing product using put', function(done){
        var product = createProductObject("PutTestProduct");
        serverActor.productService.put(product,function(err,savedProduct){
            expect(savedProduct.name).to.equal("PutTestProduct");
            savedProduct.name = "NameAfterUpdate";
            serverActor.productService.put(savedProduct,function(){
                serverActor.productService.getById(savedProduct._id,function(secondProduct){
                    expect(secondProduct.name).to.equal("NameAfterUpdate");
                    done();
                })
            });
        });
    });
});

var randomInt = function (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var createProductObject = function(name){
    return {
        _id : randomInt(1,500000),
        name : name

    };
}

var createProduct = function(name,callback){
    var product = createProductObject(name);
    serverActor.productService.put(product,callback);
}