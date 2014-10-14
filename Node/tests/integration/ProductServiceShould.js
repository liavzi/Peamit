var chai = require("chai");
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
var serverActor = require("./framework/serverActor");


describe('ProductService', function(){
    it('should save and return product', function(done){
    	serverActor.productService.post({"_id":5010,"name":"SomeProduct"},function(res){
            console.log(res.statusCode);
            done();
        });
    });
});