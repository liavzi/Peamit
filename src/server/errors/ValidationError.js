var ValidationError = (function () {
    function ValidationError(name, message) {
        this.name = name;
        this.message = message;
    }
    return ValidationError;
})();
module.exports = ValidationError;
