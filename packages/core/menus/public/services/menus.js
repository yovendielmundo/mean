'use strict';

angular.module('mean.menus').factory('ManageMenus', ['$http',
	function($http) {
		var get = function(callback) {
			// Temporary - probably it should to be resource based.
			$http.get('/api/admin/menus').success(function(data, status, headers, config) {
				callback({
					success: true,
					menus: data
				});
			}).
			error(function(data, status, headers, config) {
				callback({
					success: false
				});
			});
		};
		var update = function(menus, callback) {
			$http.put('/api/admin/menus', menus).success(function(data, status, headers, config) {
				callback(data);
			}).
			error(function(data, status, headers, config) {
				callback(data);
			});
		};
		return {
			get: get,
			update: update
		};
	}
]);