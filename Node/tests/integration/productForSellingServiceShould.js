var chai = require("chai");
var expect = chai.expect;
var serverActor = require("./framework/serverActor");
var async = require("async");
var testUtils = require("./framework/testUtils");

describe('productForSellingServiceShould', function(){
    it('return a product with its price', function(done){
        testUtils.createProductWithPrice("someProduct",10,function(err,productWithPrice) {
            serverActor.productForSellingService.getById(productWithPrice._id,function(err,returnedProduct) {
                expect(returnedProduct._id).to.equal(productWithPrice._id);
                expect(returnedProduct.price).to.equal(10);
                done();
            });
        });
    });
});
