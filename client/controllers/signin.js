'use strict';

var angular = require('angular');

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