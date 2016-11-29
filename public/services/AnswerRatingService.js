/**
 * Created by opiru on 26.11.2016.
 */
;(function () {
    'use strict';

    class AnswerRatingService {

        constructor($http) {
            this.$http = $http;
        }

        /**
         *
         * @param ENUM [+, -] type
         * @param int answerId
         * @returns {*}
         */
        create(type, answerId) {
            return this.$http.post('/answer-rating', {
                type: type,
                answerId: answerId
            });
        }
    }

    angular.module('app').factory('AnswerRatingService', ['$http',
        AnswerRatingService])
})();