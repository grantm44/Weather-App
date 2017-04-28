'use strict';
var angular = require('angular');
var sky = require('skycons');
var moment = require('moment-timezone');
//require('skycons');
//require('angularskycons');


function MapController(dataService, $compile, $scope){


  var vm = this;
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var markers = [];
  vm.place = {};
  vm.forecast = {};
/*  vm.forecast.daily = {};
  vm.forecast.currently = {};*/

  vm.initialize = function(){
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });

    var input = document.getElementById('place');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function(){
      marker.setVisible(false);

      var place = autocomplete.getPlace();
      if(!place.geometry){
        console.log('no details available for input:' + place.name);
        return;
      }
      vm.loc = place;
      //coords object and get weather forecast
      
      var lat = place.geometry.location.lat().toString();
      var lng = place.geometry.location.lng().toString();
      
      getForecast(lat, lng);
     
      if(place.geometry.viewport){
        map.fitBounds(place.geometry.viewport);
      }else{
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    

    });
  } 
  
  vm.getDate = function(day){
    return new Date(day * 1000).toGMTString().slice(0,7);
  }
  vm.maxTemp = function(temp){
    return Math.round(temp) + '\u00B0';
  }
  vm.minTemp = function(temp){
    return Math.round(temp) + '\u00B0';
  }
  vm.getTime = function(time){
    var date = new Date(time * 1000);
    date = moment(date);
    date = date.tz(vm.timezone).format('h:mm a');
    return date;
  }

  vm.expand = function(){
    
  }

  function getForecast(lat, lng){
    dataService.getForecast(lat, lng).then(function(response){
      vm.timezone = response.data.data.timezone;
      vm.forecast.currently = response.data.data.currently;
      vm.currentTemp = Math.round(vm.forecast.currently.temperature) + '\u00B0';
      vm.forecast.daily = response.data.data.daily;
      console.log(vm.forecast.daily);
      console.log(vm.forecast.currently);
    });
  }

}

module.exports = MapController;

