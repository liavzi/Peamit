var express = require("express");
var genericRouter = express.Router();
var GenericService = require("../services/GenericService");

var productService = new GenericService(require("../models/ProductModel"));
entityToService = {
    "products" : productService
};

function getService(req) {
    return entityToService[req.params.entityName];
}

function handleErrorOrWriteToResponse(err, next, res, entity) {
    if (err) next(err);
    res.json(entity);
    res.end();
}
genericRouter.route("/:entityName")
    .post(function (req,res,next){
        getService(req).createOrUpdate(req.body,function(err,entity){
            handleErrorOrWriteToResponse(err,next,res,entity)
        });
    })
    .get(function(req,res,next){
        getService(req).getAll(function(err,entities){
            handleErrorOrWriteToResponse(err,next,res,entities)
        });
    });

genericRouter.route("/:entityName/:entityId")
    .get(function (req,res,next){
        getService(req).getById(req.params.entityId,function(err,entity){
            handleErrorOrWriteToResponse(err, next, res, entity);
        });
    })
    .put(function(req,res,next){
        getService(req).createOrUpdate(req.body,function(err,entity){
            handleErrorOrWriteToResponse(err, next, res, entity);
        });
    });

module.exports = genericRouter;


