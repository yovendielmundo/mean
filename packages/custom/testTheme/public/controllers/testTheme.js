'use strict';

/* jshint -W098 */
angular.module('mean.testTheme').controller('TestThemeController', ['$scope', 'Global', 'TestTheme',
  function($scope, Global, TestTheme) {
    $scope.global = Global;
    $scope.package = {
      name: 'testTheme'
    };
  }
]);
