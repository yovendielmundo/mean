'use strict';

angular.module('mean.system').controller('FooterController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state',
  function($scope, $rootScope, Menus, MeanUser, $state) {

    var vm = this;

    vm.menus = {};

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name) {

      Menus.query({
        name: name
      }, function(menu) {
        vm.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('footer');

    $rootScope.$on('loggedin', function() {
      queryMenu('footer');
    });

    $rootScope.$on('logout', function() {
      queryMenu('footer');
    });
  }
]);