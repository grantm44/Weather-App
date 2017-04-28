var darksky = require('./config'),
  express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  passport = require('passport');
var User = require('../models/user');

router.get('/api/user', function(req, res, next){
  var data = {};
  data.user = []
  //console.log(req.user);
  if(req.user){
    data.user.push(req.user);
    res.json(data);
  }else{
    data.user = null;
    res.json(data);
  }
});

router.get('/api/tweets', function(req, res, next){
  console.log(req.query)
  console.log(req.query.lng)
  var lat = req.query.lat;
  var lng = req.query.lng;
  //var geocodeString = lat +',' + lng +',' + '1000mi';
  darksky.latitude(lat).longitude(lng).get().then(function(data){
    var forecast = {};
    forecast.data = data;
    res.json(forecast);
  }
)});  

//redirect to google for authentication
router.get('/api/signin', passport.authenticate('google', { scope: ['profile'] }),
  function(req, res){
    console.log('signed in');
  });

//redirect to map after authenticated
router.get('/api/map', 
  passport.authenticate('google', 
    { sucessRedirect: '/#!/map',
      failureRedirect: '/',
      failureFlash: true }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('signed in2');
    res.redirect('/#!/map');
  });

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    if(err) return next(err);
    req.logout();
    console.log('session ended');
    res.redirect('/');  
  });
});

module.exports = router;