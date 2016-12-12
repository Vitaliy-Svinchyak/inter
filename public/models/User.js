/**
 * Created by opiru on 23.11.2016.
 */

;(function () {
    'use strict';

    class User {

        constructor($cookies) {
            this.$cookies = $cookies;
        }

        setData(userData) {
            this.data = userData;
            if (this.data.token) {
                this.$cookies.put('token', this.data.token);
            }
        }

        clearData(){
            this.data = null;
            this.$cookies.remove('token');
        }

        getToken() {
            let cookieToken = this.$cookies.get('token');
            if (cookieToken) {
                return cookieToken;
            }
            if (this.data) {
                return this.data.token;
            }
            return false;
        }

        getId() {
            if (this.data) {
                return this.data.id;
            }
            return false;
        }

        getData() {
            return this.data;
        }
    }

    angular.module('app').factory('UserModel', ['$cookies', User])
})();