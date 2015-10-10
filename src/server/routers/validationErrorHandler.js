var validationErrorHandler = function (err, req, res, next) {
    if (err instanceof Error && err.name === "ValidationError") {
        return res.json(400, err);
    }
    next(err);
};
module.exports = validationErrorHandler;