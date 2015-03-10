var productForSellingRouter = require("../routers/productForSellingRouter");
var genericRouter = require("./genericRouter");
var orderRouter = require("./orderRouter");
var Order = require("../models/OrderModel");
function registerRouters (express,app){
    var apiRouter = express.Router();
    apiRouter.use(productForSellingRouter);
    apiRouter.use(genericRouter);
    apiRouter.use("/orders/:orderId",loadOrder);
    apiRouter.use("/orders/:orderId",orderRouter);
    app.use("/api",apiRouter);
}

function loadOrder(req,res,next){
    Order.strictFindById(req.params.orderId, function (err,order) {
        if (err) return next(err);
        req.order = order;
        next();
    });
}

module.exports = registerRouters;