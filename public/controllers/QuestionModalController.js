/**
 * Created by opiru on 26.11.2016.
 */

;(function () {
    'use strict';

    angular.module('app').controller('QuestionModalController', ['$scope', '$mdDialog',
        'UserModel', 'question', 'AnswerRatingService', 'AnswerService',
        function ($scope, $mdDialog, User, question, AnswerRatingService, AnswerService) {
            $scope.question = question;
            $scope.commentsOpened = false;
            $scope.showAnswerForm = false;
            $scope.answerObject = {};


            $scope.currentUser = User.getData();

            $scope.hide = () => $mdDialog.hide();

            $scope.cancel = () => $mdDialog.cancel();

            $scope.close = () => $mdDialog.hide();

            $scope.answer = () => $scope.showAnswerForm = true;

            $scope.showComments = () => $scope.commentsOpened = true;

            $scope.plus = function plus(answerId) {
                AnswerRatingService.create('+', answerId)
                    .success(data => {
                        $scope.question.answers.forEach((answer) => {
                            if (answer.id === answerId) {
                                answer.can_plus = false;
                                answer.rating = data.newRating;
                            }
                        })
                    });
            };

            $scope.minus = function minus(answerId) {
                AnswerRatingService.create('-', answerId)
                    .success(data => {
                        $scope.question.answers.forEach((answer) => {
                            if (answer.id === answerId) {
                                answer.can_plus = false;
                                answer.rating = data.newRating;
                            }
                        })
                    });
            };

            $scope.sendAnswer = function (answerForm) {
                if (answerForm.$valid) {
                    AnswerService.create($scope.answerObject, $scope.question.id)
                        .success(data => {
                            $scope.answerObject = {};
                            $scope.showAnswerForm = false;
                            $scope.question.answers.push(data.answer);
                        });
                }
            };
        }])
})();
