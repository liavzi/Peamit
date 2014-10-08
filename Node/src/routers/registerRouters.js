var productRouter = require("./productRouter");

function registerRouters (app){
	app.use("/api",productRouter);
}

module.exports = registerRouters;