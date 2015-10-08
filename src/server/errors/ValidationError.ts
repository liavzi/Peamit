import IValidationError = require("../../schemas/errors/IValidationError");

class ValidationError implements IValidationError{
    constructor(public name:string,public message:string){}
}

export = ValidationError;