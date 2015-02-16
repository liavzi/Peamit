var express = require("express");
var genericRouter = express.Router();
var GenericService = require("../services/GenericService");
var orderService = require("../services/orderService");
var tagService = require("../services/tagService");

entityToService = {
    "products" :  new GenericService(require("../models/ProductModel")),
    "prices" : new GenericService(require("../models/PriceModel")),
    "orders" : orderService,
    "tags" : tagService
};

function getService(req) {
    return entityToService[req.params.entityName];
}

function handleErrorOrWriteToResponse(err, next, res, entity) {
    if (err) next(err);
    else{
        res.json(entity);
        res.end();
    }
}
genericRouter.route("/:entityName")
    .post(function (req,res,next){
        getService(req).create(req.body,function(err,entity){
            handleErrorOrWriteToResponse(err,next,res,entity)
        });
    })
    .get(function(req,res,next){
        getService(req).getAll(req.query,function(err,entities){
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
    })
    .delete(function(req,res,next){
        getService(req).deleteById(req.params.entityId,function(err,entity){
            handleErrorOrWriteToResponse(err, next, res, entity);
        });
    });

module.exports = genericRouter;


