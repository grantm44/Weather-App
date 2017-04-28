webpackJsonp([0],{

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(1);
var app = angular.module('app');

app.controller('MapController', __webpack_require__(129));
app.controller('NavController', __webpack_require__(130));
app.controller('signin', __webpack_require__(131));

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var app = angular.module('app');

app.directive('skyIcon', ['dataService', __webpack_require__(132)]);

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(1);
var app = angular.module('app');

app.config(__webpack_require__(133));

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(1);
var app = angular.module('app');

app.service('dataService', __webpack_require__(135));

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
var sky = __webpack_require__(2);
var moment = __webpack_require__(3);
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



/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(1);

function NavController(dataService){
  var vm = this;
  vm.loggedIn = {};
  //vm.user();
  vm.currentUser = {};
  vm.user = function() { 
    dataService.getUser().then(function(res){
        console.log('user:' + res.user);
        vm.currentUser = res && res.data && res.data.user && res.data.user[0];
        console.log(vm.currentUser);
        if(vm.currentUser){
          vm.loggedIn.found = true;
        }else{
          vm.loggedIn.found = false; //should be false if undefined?
        }
        console.log('logged in: ' + vm.loggedIn.found);
      });
    }
    vm.user();
};

module.exports = NavController;



  


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(1);

function signin(dataService){
  var vm = this;
  vm.loggedIn = {};
  vm.user = function() { 
    console.log('called');
    dataService.getUser().then(function(res){
        if(res){
          vm.loggedIn.found = true;
        }else{
          vm.loggedIn.found = false;
        }
        console.log(vm.loggedIn.found);
      });
    }
};

module.exports = signin;

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function skyIcon(dataService){
  var _dataService = dataService;
  return {
    retrict: 'E',
    link: linkFn
  }
  function linkFn(scope, element, attrs){
    var canvas = document.createElement( "canvas" );
    canvas.height = 40;
    canvas.width = 40;

    var iconType = attrs['iconType']; 
    _dataService.add(canvas, iconType);
    _dataService.play();
    
    if ( element[0].nodeType === 8 ) {
        element.replaceWith( canvas );
    } else {
        element[0].appendChild( canvas );
    }
  
  }

}

module.exports = skyIcon;

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function config($httpProvider, $routeProvider){
  $routeProvider
  .when('/map', {
    controller: 'MapController',
    controllerAs: 'vm',
    templateUrl: '/templates/map.html'
  })
/*  .when('/', {
    controller: 'NavController',
    controllerAs: 'vm',
    templateUrl: '/index.html'
  })*/.
  when('/', {
    controller: 'signin',
    controllerAs: 'vm',
    templateUrl: '/templates/sign-in.html'
  })
  .otherwise({
    redirectTo: '/'
  });


}

module.exports = config;

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(1);
//import skycons from 'skycons';
__webpack_require__(2);


angular.module('app', ['ngRoute',  'ngAnimate']);

__webpack_require__(119);
__webpack_require__(121);
__webpack_require__(122);
__webpack_require__(120);








/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//var angular = require('angular');
var sky = __webpack_require__(2);

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

/***/ })

},[134]);