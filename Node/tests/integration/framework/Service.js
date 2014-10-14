var config = require("./IntegrationTestConfig.json");
var request = require("superagent");


function Service(serviceName){
	this.serviceName =	this.serviceName;
}

Service.prototype.getById = function(id,callback){
	request(config.serverUrl)
		.get("//"+this.serviceName+"//"+id)
		.end(function(res){
			callback(res.body);
		});
};

Service.prototype.post = function(data,callback){
	request
		.post(config.serverUrl+"//"+this.serviceName)
		.send(data)
		.end(function(res){
			callback(res.body);
		});
};

module.exports = Service;