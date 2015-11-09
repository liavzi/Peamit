import ContactCustomerRequestModel = require("../models/ContactCustomerRequest");
let ContactCustomerRequest = ContactCustomerRequestModel.contactCustomerRequestModel;

class ContactCustomerRequestService{
	create(contactCustomerRequet,callback){
		ContactCustomerRequest.create(contactCustomerRequet,callback)		
	}
	
	getAll(query,callback){
		ContactCustomerRequest.find({},callback);
	}
		
}

export = new ContactCustomerRequestService();