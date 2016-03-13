var express = require("express");
var router = express.Router();
router.route("/closeAsSelfPickup")
    .post(function (req, res, next) {
    var order = req.order;
    order.closeAsSelfPickup(req.body, function (err) {
        if (err)
            return next(err);
        order.save(function (err, order) {
            if (err)
                return next(err);
            res.json(order).end();
        });
    });
});
module.exports = router;
