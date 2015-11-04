var productForSellingRouter = require("./productForSellingRouter");
var genericRouter = require("./genericRouter");
var orderRouter = require("./orderRouter");
var Order = require("../models/OrderModel");
var orderSchema = require("../schemas/orderSchema");
var validationErrorHandler = require("./validationErrorHandler");
var imagesRouter = require("./imagesRouter");
var txnRouter = require("./txnRouter");
function registerRouters(express, app) {
    var apiRouter = express.Router();
    apiRouter.use(productForSellingRouter);
    apiRouter.use(txnRouter);
    apiRouter.use(imagesRouter);
    apiRouter.use("/myOrder", loadOrder);
    apiRouter.use("/myOrder", orderRouter);
    apiRouter.use(genericRouter);
    apiRouter.use(validationErrorHandler);
    app.use("/api", apiRouter);
}
function loadOrder(req, res, next) {
    if (req.path.indexOf("items") !== -1 && !req.session.orderId)
        return next();
    Order.strictFindById(req.session.orderId, function (err, order) {
        if (err)
            return next(err);
        if (order.status === 1 /* paid */) {
            req.session.orderId = null;
        }
        else
            req.order = order;
        next();
    });
}
module.exports = registerRouters;
