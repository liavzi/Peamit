///<reference path="../../../typings/tsd.d.ts" />
var ClubRegistration = require("../models/ClubRegistration");
var express = require("express");
var clubRegistrationRouter = express.Router();
var users = require("../businessComponents/users");
clubRegistrationRouter.route("/club-registration")
    .get(users.ensureAdmin, function (req, res, next) {
    ClubRegistration.find({}, function (err, requests) {
        if (err)
            return next(err);
        res.json(requests).end();
    });
})
    .post(function (req, res, next) {
    ClubRegistration.create(req.body, function (err, request) {
        if (err)
            return next(err);
        res.json(request).end();
    });
});
clubRegistrationRouter.route("/club-registration/:id")
    .delete(users.ensureAdmin, function (req, res, next) {
    ClubRegistration.findByIdAndRemove(req.params.id, function (err, request) {
        if (err)
            return next(err);
        res.json(request).end();
    });
});
module.exports = clubRegistrationRouter;
