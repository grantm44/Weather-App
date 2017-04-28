'use strict';

var angular = require('angular');
var app = angular.module('app');

app.controller('MapController', require('./mapcontroller'));
app.controller('NavController', require('./navcontroller'));
app.controller('signin', require('./signin'));