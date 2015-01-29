var productForSellingRouter = require("../routers/productForSellingRouter");
var genericRouter = require("./genericRouter");
var addItemToOrderRouter = require("./addItemToOrderRouter");
var orderLinesRouter = require("./orderLinesRouter");
var closeOrderByPhoneRouter = require("./closeOrderByPhoneRouter");
function registerRouters (express,app){
    var apiRouter = express.Router();
    apiRouter.use("/api",productForSellingRouter);
    apiRouter.use("/api",genericRouter);
    apiRouter.use("/api", addItemToOrderRouter);
    apiRouter.use("/api", orderLinesRouter);
    apiRouter.use("/api", closeOrderByPhoneRouter);
    app.use(apiRouter);
}

module.exports = registerRouters;