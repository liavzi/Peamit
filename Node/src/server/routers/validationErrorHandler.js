var validationErrorHandler = function (err, req, res, next) {
    if (err instanceof Exceptions.IValidationException) {
        return res.json(400, err);
    }
    next(err);
};
module.exports = validationErrorHandler;
