/**
 * Created by opiru on 04.11.2016.
 */
;(function () {
    'use strict';

    class RegistrationController {

        constructor($http) {
            this.$http = $http;
            this.email = '';
            this.comment = '';
        }

        register(registerForm) {
            if (registerForm.$valid) {
                this.$http.post('/user/ask-for-account',
                    {
                        email: this.email,
                        comment: this.comment,
                        window: {
                            height: window.height,
                            width: window.width,
                        }
                    });
            }
        }
    }

    angular.module('app').controller('RegistrationController', ['$http', RegistrationController])
})();