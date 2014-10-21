var chai = require("chai");
var expect = chai.expect;
var serverActor = require("./framework/serverActor");
var async = require("async");

describe('ProductService', function(){
    it('should create a new product when using put', function(done){
        var product = createProductObject("PutTestProduct");
        serverActor.productService.put(product,function(res){
            serverActor.productService.getById(product._id,function(savedProduct){
                expect(savedProduct.name).to.equal("PutTestProduct");
                done();
            })
        });
    });

    it('should update existing product using put', function(done){
        var product = createProductObject("PutTestProduct");
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

    it('Return all products', function(done){
        async.parallel([
            function(){createProduct("GetAllProduct1")},
            function(){createProduct("GetAllProduct2")},
            function(){createProduct("GetAllProduct3")}],
            function(err,results){
                serverActor.productService.getAll(function(products){
                    expect(products.some(function(x){return x.name=="GetAllProduct1"})).to.be.true;
                    expect(products.some(function(x){return x.name=="GetAllProduct2"})).to.be.true;
                    expect(products.some(function(x){return x.name=="GetAllProduct3"})).to.be.true;
                    done();
                })
            }
        );
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
    serverActor.productService.put(product,callback || function(){});
}