'use strict';

angular.module('mean.menus').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state('menus', {
			url: '/admin/menus',
			templateUrl: 'menus/views/index.html',
			resolve: {
				isAdmin: function(MeanUser) {
					return MeanUser.checkAdmin();
				}
			}
		});
	}
]);