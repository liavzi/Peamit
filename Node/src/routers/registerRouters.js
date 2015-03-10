var productForSellingRouter = require("../routers/productForSellingRouter");
var genericRouter = require("./genericRouter");
var addItemToOrderRouter = require("./addItemToOrderRouter");
var orderLinesRouter = require("./orderLinesRouter");
var closeOrderByPhoneRouter = require("./closeOrderByPhoneRouter");
var Order = require("../models/OrderModel");
function registerRouters (express,app){
    var apiRouter = express.Router();
    var orderRouter = express.Router();
    apiRouter.use(productForSellingRouter);
    apiRouter.use(genericRouter);
    orderRouter.use(addItemToOrderRouter);
    orderRouter.use(orderLinesRouter);
    orderRouter.use(closeOrderByPhoneRouter);
    apiRouter.all("/orders/:orderId/*",loadOrder);
    apiRouter.use("/orders/:orderId",orderRouter)
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