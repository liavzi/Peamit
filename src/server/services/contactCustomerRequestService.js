var ContactCustomerRequestModel = require("../models/ContactCustomerRequest");
var ContactCustomerRequest = ContactCustomerRequestModel.contactCustomerRequestModel;
var ContactCustomerRequestService = (function () {
    function ContactCustomerRequestService() {
    }
    ContactCustomerRequestService.prototype.create = function (contactCustomerRequet, callback) {
        ContactCustomerRequest.create(contactCustomerRequet, callback);
    };
    ContactCustomerRequestService.prototype.getAll = function (query, callback) {
        ContactCustomerRequest.find({}, callback);
    };
    return ContactCustomerRequestService;
})();
module.exports = new ContactCustomerRequestService();
