'use strict';

angular.module('mean.admin').controller('AdminController', ['$scope', 'Global', 'Menus', '$rootScope', 'MeanUser',
    function($scope, Global, Menus, $rootScope, MeanUser) {
        $scope.global = Global;
        $scope.menus = {};
        $scope.overIcon = false;
        $scope.user = MeanUser;


        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name) {

            Menus.query({
                name: name
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('admin');

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('admin');

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });
    }
]);
