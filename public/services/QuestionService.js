/**
 * Created by opiru on 26.11.2016.
 */
;(function () {
    'use strict';

    class QuestionService {

        constructor($http, $stateParams) {
            this.$http = $http;
            this.$stateParams = $stateParams;
        }

        get(options) {
            options.type = this.$stateParams.category;

            let params = '';
            for (let option in options) {
                if (options.hasOwnProperty(option)) {
                    params += `${option}=${options[option]}&`;
                }
            }
            params = params.substr(0, params.length - 1);

            return this.$http.get(`/question?${params}`);
        }

        create(question) {
            return this.$http.post('/question', question);
        }
    }

    angular.module('app').factory('QuestionService', ['$http', '$stateParams',
        QuestionService])
})();