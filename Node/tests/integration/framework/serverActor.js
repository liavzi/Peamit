var Service = require("./Service");

var serverActor = {
	productService : new Service("products")
}

module.exports = serverActor;