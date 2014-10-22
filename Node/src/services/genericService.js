function GenericService(model){
    this._model = model;
}

GenericService.prototype.createOrUpdate = function(entity,callback){
    var model = this._model;
    this._model.findById(entity._id,function(err,dbEntity){
        if (err) callback(err);
        if (!dbEntity)
            model.create(entity,callback);
        else
            dbEntity.update(entity,callback);
    });
};

GenericService.prototype.getAll = function(callback){
    this._model.find({},callback);
 };

GenericService.prototype.getById = function(id,callback){
    this._model.findById(id,callback);
};

module.exports = GenericService;

