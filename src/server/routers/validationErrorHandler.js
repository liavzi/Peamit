var validationErrorHandler = function (err, req, res, next) {
    if (err instanceof Error) {
        if ((err.name === "ValidationError"))
            err.message = err.toString();
        return res.json(400, err);
    }
    next(err);
};
module.exports = validationErrorHandler;
