'use strict';
//var angular = require('angular');
var sky = require('skycons');

function DataService($http){

  var skycons = new sky.Skycons({'color': 'black'});
  var currentUser;
  this.add = function(element, icon){
    skycons.add(element, icon);
  }

  this.play = function(){
    skycons.play();
  }

  this.getForecast = function(lat, lng){
    return $http.get('api/tweets', {params: {lat: lat, lng: lng}});
  };

  this.getUser = function(){
    return $http.get('/api/user');
  };


};

module.exports = DataService;