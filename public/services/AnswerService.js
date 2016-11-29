/**
 * Created by opiru on 27.11.2016.
 */
;(function () {
    'use strict';

    class AnswerService {

        constructor($http) {
            this.$http = $http;
        }

        /**
         *
         * @param object answerObject
         * @param int questionId
         * @returns {*}
         */
        create(answerObject, questionId) {
            answerObject.questionId = questionId;
            return this.$http.post('/answer', answerObject);
        }
    }

    angular.module('app').factory('AnswerService', ['$http',
        AnswerService])
})();