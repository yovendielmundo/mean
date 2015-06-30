'use strict';

/* jshint -W098 */
angular.module('mean.menus').controller('MenusController', ['$scope', 'ManageMenus', 'ModuleSettings', 'Menus',
	function($scope, ManageMenus, ModuleSettings, Menus) {
		var vm = this;
		vm.menus = {};

		$scope.package = {
			name: 'menus'
		};

		function queryMenu(name) {

			Menus.query({
				name: name,
				settings: true
			}, function(menu) {
				function compare(a, b) {
					if (parseInt(a.position) < parseInt(b.position))
						return -1;
					if (parseInt(a.position) > parseInt(b.position))
						return 1;
					return 0;
				}
				menu.sort(compare);
				vm.menus[name] = menu;
			});
		}

		$scope.find = function() {
			ModuleSettings.get('menus').then(function(data) {
				vm.data = data;
				for (var i = 0; i < data.menus.length; i++) {
					queryMenu(data.menus[i]);
				}
			}, function(err) {
				console.log('err', err);
			});
			vm.selected = 'main';
		};

		$scope.save = function(menus) {
			ManageMenus.update(menus, function(data) {});
		};

		$scope.add = function(key) {
			$scope.newItem.action = 'add';
			$scope.newItem.value.roles = $scope.newItem.value.roles.split(',');

			if (!vm.menus[key]) vm.menus[key] = [];
			$scope.newItem.key = key;
			$scope.newItem.value.name = $scope.newItem.value.title;
			$scope.newItem.value.position = vm.menus[key].length;
			vm.menus[key].push($scope.newItem.value);
			$scope.save($scope.newItem);
			$scope.newItem = {
				value: {}
			};
		};

		$scope.remove = function(key, value) {
			value.disable = true;
			$scope.save({
				key: key,
				value: value,
				action: 'remove'
			});
		};

		$scope.enable = function(key, value) {
			value.disable = false;
			$scope.save({
				key: key,
				value: value,
				action: 'enable'
			});
		};

		$scope.update = function(key, value) {
			if (typeof(value.roles) !== 'object')
				value.roles = value.roles.split(',');

			$scope.save({
				key: key,
				value: value,
				action: 'update'
			});
		};

		$scope.onDropComplete = function(index, obj, evt, key) {
			if (obj.key === key) {
				var otherIndex = vm.menus[key].indexOf(obj.menu);
				if (index < otherIndex) {
					var a = index;
					var b = otherIndex + 1;
				} else {
					var a = otherIndex;
					var b = index + 1;
				}
				vm.menus[key].splice(otherIndex, 1);
				vm.menus[key].splice(index, 0, obj.menu);
				var menus = {
					key: key,
					action: 'update',
					value: []
				};
				for (var i = a; i < b; i++) {
					vm.menus[key][i].position = i;
					menus.value.push(vm.menus[key][i]);
				}
				$scope.save(menus);
			}
		};

		this.dropCallback = function(event, ui, obj, index, key) {
			var otherIndex = vm.menus[key].indexOf(obj);
			if (index < otherIndex) {
				var a = index;
				var b = otherIndex + 1;
			} else {
				var a = otherIndex;
				var b = index + 1;
			}
			if (index < otherIndex) {
				vm.menus[key].splice(otherIndex, 1);
				vm.menus[key].splice(index + 1, 0, obj);
			} else {
				vm.menus[key].splice(otherIndex, 1);
				vm.menus[key].splice(index - 1, 0, obj);
			}
			var menus = {
				key: key,
				action: 'update',
				value: []
			};
			for (var i = a; i < b; i++) {
				vm.menus[key][i].position = i;
				menus.value.push(vm.menus[key][i]);
			}
			$scope.save(menus);
		};

		$scope.addNewMenu = function() {
			if (vm.data.menus.indexOf(vm.newMenu) > -1) {
				alert('menu already exists.');
				vm.createMenu = false;
				vm.selected = vm.newMenu;
				vm.newMenu = '';
			} else if (vm.newMenu && vm.newMenu !== '') {
				vm.data.menus.push(vm.newMenu);
				ModuleSettings.update('menus', {
					menus: vm.data.menus
				}).then(function(data) {
					vm.createMenu = false;
					vm.selected = vm.newMenu;
					vm.newMenu = '';
				}, function(err) {
					console.log('err', err);
				});
			} else {
				alert('name of menu is required.');
			}
		};

		$scope.cancelCreate = function() {
			$scope.newItem = {
				value: {}
			};
			vm.createNew = false;
		}
	}
]);