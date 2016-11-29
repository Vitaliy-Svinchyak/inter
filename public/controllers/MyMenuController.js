/**
 * Created by opiru on 07.11.2016.
 */
;(function () {
    'use strict';
    angular.module('app')
    //Controller for everything with hashes
        .controller('MyMenuController', ['$scope', '$location',
            function ($scope, $location) {

                $scope.go = function (to) {
                    $location.url('/my/' + to);
                };

            }])
})();