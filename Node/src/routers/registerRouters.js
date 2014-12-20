var productForSellingRouter = require("../routers/productForSellingRouter");
var genericRouter = require("./genericRouter");
var addItemToOrderRouter = require("./addItemToOrderRouter");
var orderLinesRouter = require("./orderLinesRouter");
var closeOrderByPhoneRouter = require("./closeOrderByPhoneRouter");
function registerRouters (app){
	app.use("/api",productForSellingRouter);
	app.use("/api",genericRouter);
    app.use("/api", addItemToOrderRouter);
    app.use("/api", orderLinesRouter);
    app.use("/api", closeOrderByPhoneRouter);
}

module.exports = registerRouters;