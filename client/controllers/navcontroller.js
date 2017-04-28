'use strict';

var angular = require('angular');

function NavController(dataService){
  var vm = this;
  vm.loggedIn = {};
  //vm.user();
  vm.currentUser = {};
  vm.user = function() { 
    dataService.getUser().then(function(res){
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



  
