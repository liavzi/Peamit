var productRouter = require("./productRouter");
var genericRouter = require("./genericRouter");

function registerRouters (app){
	//app.use("/api",productRouter);
	app.use("/api",genericRouter);
}

module.exports = registerRouters;