var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
chai.use(chaiHttp);
var serverActor = require("./framework/serverActor");


describe('ProductService', function(){
    it('should save and retrun product', function(done){
    	serverActor.productService.post({"_id":5010,"name":"SomeProduct"},function(res){done();}); 	
    });
});