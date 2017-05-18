(function() {
    'use strict'

    var deviceready = angular
        .module('ngDeviceready', [])
        .service('$deviceready', DeviceReady);

    DeviceReady.$inject = ['$scope', '$timeout'];

    function DeviceReady() {
        return function(callback) {
            $timeout(function() {
                $scope.$apply(function() {
                    document.addEventListener('deviceready', function() {
                        callback();
                    }, false);
                });
            });
        }
    }

}());