var users = require("./businessComponents/users");
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var registerRoutes = require("./routers/registerRouters");
var path = require('path');
var databaseConfig = require("./config/databaseConfig.json");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var callbackURL = "http://localhost:8080/auth/google/callback";
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    var mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + "node";
    mongoose.connect(mongodb_connection_string);
    callbackURL = "http://node-hermeny.rhcloud.com/auth/google/callback";
}
else {
    mongoose.connect(databaseConfig.url);
}
passport.use(new GoogleStrategy({
    clientID: "182243328912-qgkbqvdkv3g81lr5sbuithf04jrcns24.apps.googleusercontent.com",
    clientSecret: "tmol5ZgFbBvSd81Zi682DZaK",
    callbackURL: callbackURL
}, function (accessToken, refreshToken, profile, done) {
    users.userRepository.getByGoogleProfileId(profile.id, function (err, user) {
        if (err)
            return done(err);
        if (user)
            return done(null, user);
        done(null, false);
    });
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/ManagementViews", users.ensureAdminOrRedirectToLogin);
app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (obj, done) {
    users.userRepository.getById(obj, function (err, user) {
        if (err)
            return done(err);
        done(null, user);
    });
});
// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google', { scope: ["email"] }));
// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/ManagementViews',
    failureRedirect: '/Views/managementLogin.html' }));
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080; // set our port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
registerRoutes(express, app);
// START THE SERVER
// =============================================================================
app.listen(port, server_ip_address);
console.log('Magic happens on port ' + port);
