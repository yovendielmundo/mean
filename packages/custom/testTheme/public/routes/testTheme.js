'use strict';

angular.module('mean.testTheme').config(['$viewPathProvider', '$stateProvider',
  function($viewPathProvider, $stateProvider) {
    $viewPathProvider.override('system/views/index.html', 'testTheme/views/index.html');
  }
]);

