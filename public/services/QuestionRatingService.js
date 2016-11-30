/**
 * Created by opiru on 30.11.2016.
 */
;(function () {
    'use strict';

    class QuestionRatingService {

        constructor($http) {
            this.$http = $http;
        }

        /**
         *
         * @param type ENUM [+, -]
         * @param questionId int
         * @returns {*}
         */
        create(type, questionId) {
            return this.$http.post('/question-rating', {
                type: type,
                questionId: questionId
            });
        }
    }

    angular.module('app').factory('QuestionRatingService', ['$http',
        QuestionRatingService])
})();