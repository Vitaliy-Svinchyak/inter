/**
 * Created by opiru on 03.12.2016.
 */

;(function () {
    'use strict';

    class LogoutController {

        constructor($http, $location, UserModel) {
            this.$http = $http;
            this.$location = $location;
            this.UserModel = UserModel;

            this.logout();
        }

        logout() {
            this.$http.post('/user/exit', {})
                .success((data) => {
                    this.UserModel.clearData();
                    this.$location.url('/auth');
                });
        }
    }

    angular.module('app').controller('LogoutController', ['$http', '$location',
        'UserModel', LogoutController])
})();