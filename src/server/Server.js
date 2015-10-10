// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var registerRoutes = require("./routers/registerRouters");
var path = require('path');
var databaseConfig = require("./config/databaseConfig.json");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect(databaseConfig.url);


passport.use(new GoogleStrategy({
        clientID: "182243328912-qgkbqvdkv3g81lr5sbuithf04jrcns24.apps.googleusercontent.com",
        clientSecret: "tmol5ZgFbBvSd81Zi682DZaK",
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile.id ==="102414180728342095926")
            return done(null,accessToken);
        done(null,false);
    }
));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/ManagementViews",ensureAuthenticated);
app.use(express.static(path.join(__dirname,"../client")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google',{scope : ["email"]}));



// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/callback',passport.authenticate('google', {
    successRedirect: '/ManagementViews',
    failureRedirect: '/ManagementViews/managementLogin' }));





function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/Views/managementLogin.html');
}


var port = process.env.PORT || 8080; 		// set our port

registerRoutes(express,app);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);