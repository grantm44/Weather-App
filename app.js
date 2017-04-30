//
'use strict';

var express = require('express'),
  logger = require('morgan'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  routes = require('./server/routes/twitroutes.js'),
  session = require('express-session'),
  methodOverride = require('method-override');
var MongoStore = require('connect-mongo')(session);
var User = require('./server/models/user');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '253001299435-ne5966tplaindj7pe8bfnhcs3883bj82.apps.googleusercontent.com',
    clientSecret: 'fn4rnRkc5zkHbLyNp0iQjdtj',
    callbackURL: "http://ec2-34-208-142-31.us-west-2.compute.amazonaws.com:3000/#!/map"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOneAndUpdate(
      { googleId: profile.id }, 
      { googleId: profile.id,
       access_token: accessToken,
       refresh_token: refreshToken,
       name: profile.displayName}, {upsert: true}, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user._id);
});
passport.deserializeUser(function(googleId, done){
  User.findById(googleId, done);
});

var app = express();
//mongodb://grant:<PASSWORD>@cluster0-shard-00-00-fgfgg.mongodb.net:27017,cluster0-shard-00-01-fgfgg.mongodb.net:27017,cluster0-shard-00-02-fgfgg.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
mongoose.connect('mongodb://grant:8M9CHy6KBiJHGFX0@cluster0-shard-00-00-fgfgg.mongodb.net:27017,cluster0-shard-00-01-fgfgg.mongodb.net:27017,cluster0-shard-00-02-fgfgg.mongodb.net:27017/capstone?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var db = mongoose.connection;


//session config for passport
var sessionOptions = {
  secret: 'this is a secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: db
  })
};
app.use(session(sessionOptions));
//Initialize passport
app.use(passport.initialize());
app.use(passport.session());
db.on('error', console.error.bind(console, 'connection error:'));

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:false}));
//app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, './public')));


/*app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});*/

app.use('/', routes);

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // send error status
  res.status(err.status || 500)
  // send error message as JSON
  res.json({
    error: {
      status: err.status,
      message: err.message
    }
  })
})

var server = app.listen(app.get('port'), function(){
  console.log('express server is listening on port ' + server.address().port);
});

//module.exports = app