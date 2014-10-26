var productForSellingRouter = require("../routers/productForSellingRouter");
var genericRouter = require("./genericRouter");

function registerRouters (app){
	app.use("/api",productForSellingRouter);
	app.use("/api",genericRouter);
}

module.exports = registerRouters;