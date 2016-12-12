/**
 * Created by opiru on 04.11.2016.
 */

;(function () {
    'use strict';

    class AuthController {

        constructor($http, $location, UserModel) {
            this.$http = $http;
            this.$location = $location;
            this.UserModel = UserModel;
            this.email = '';
            this.password = '';
        }

        login(authForm) {
            if (authForm.$valid) {
                this.$http.post('/user/auth',
                    {
                        email: this.email,
                        password: this.password,
                        window: {
                            height: window.height,
                            width: window.width,
                        }
                    })
                    .success((data) => {
                        this.UserModel.setData(data);
                        this.$location.url('/main/php');
                    });
            }
        }
    }

    angular.module('app').controller('AuthController', ['$http', '$location',
        'UserModel', AuthController])
})();