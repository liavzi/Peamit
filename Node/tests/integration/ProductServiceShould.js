var chai = require("chai");
var expect = chai.expect;
var serverActor = require("./framework/serverActor");

describe('ProductService', function(){
    it('should create a new product when using put', function(done){
        var product = createProduct("PutTestProduct");
        serverActor.productService.put(product,function(res){
            serverActor.productService.getById(product._id,function(savedProduct){
                expect(savedProduct.name).to.equal("PutTestProduct");
                done();
            })
        });
    });

    it('should update existing product using put', function(done){
        var product = createProduct("PutTestProduct");
        serverActor.productService.put(product,function(savedProduct){
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

var createProduct = function(name){
    return {
        _id : randomInt(1,500000),
        name : name

    };
}