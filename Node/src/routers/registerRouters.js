var productForSellingRouter = require("../routers/productForSellingRouter");
var genericRouter = require("./genericRouter");
var addItemToOrderRouter = require("./addItemToOrderRouter");
function registerRouters (app){
	app.use("/api",productForSellingRouter);
	app.use("/api",genericRouter);
    app.use("/api", addItemToOrderRouter);
}

module.exports = registerRouters;