var ValidationError = require("../errors/ValidationError");
var validationErrorHandler = function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.json(400, err);
    }
    next(err);
    var x = 4;
};
module.exports = validationErrorHandler;
