// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var registerRoutes = require("./src/routers/registerRouters");
var path = require('path');
var databaseConfig = require("./config/databaseConfig.json");
mongoose.connect(databaseConfig.url);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080; 		// set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
registerRoutes(app);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
