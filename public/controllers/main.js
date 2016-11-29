;(function () {
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('IQAHttpInterceptor');

            $stateProvider
                .state('home', {
                    url: '/main/{category:string}',
                    templateUrl: 'views/site/index.html',
                    controller: 'IndexController'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'views/auth/auth.html',
                    controller: 'AuthController'
                })
                .state('ask-for-account', {
                    url: '/ask-for-account/',
                    templateUrl: 'views/auth/registration.html',
                    controller: 'RegistrationController'
                })
                .state('my-page', {
                    url: '/my/page',
                    templateUrl: 'views/my/page.html',
                    controller: 'MyPageController'
                })
                .state('create-question', {
                    url: '/my/create-question',
                    templateUrl: 'views/my/create-question.html',
                    controller: 'CreateQuestionController'
                });

            $urlRouterProvider.otherwise('/main/php');
        }])
        .factory('IQAHttpInterceptor', ['$q', '$rootScope', 'UserModel', 'logger',
            function ($q, $rootScope, UserModel, logger) {
                return {
                    // On request success
                    request: function (config) {
                        let token = UserModel.getToken();
                        if (token) {
                            switch (config.method) {
                                case 'POST':
                                    if (!config.data) {
                                        config.data = {};
                                    }
                                    if (config.data.append) {
                                        config.data.append('token', token);
                                    }
                                    else {
                                        config.data['token'] = token;
                                    }
                                    break;

                                case 'GET':
                                    if (!config.params) {
                                        config.params = {};
                                    }
                                    config.params['token'] = token;
                                    break;
                            }
                        }
                        return config || $q.when(config);
                    },
                    // On request failure
                    requestError: function (rejection) {
                        logger.log('Request failer.', 'error');
                        return $q.reject(rejection);
                    },

                    // On response success
                    response: function (response) {
                        return response || $q.when(response);
                    },
                    // On response failture
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $rootScope.$emit("unauthorized");
                        }
                        logger.log('Response error.', 'error');
                        return $q.reject(rejection);
                    }
                };
            }])

        .factory('logger', function () {
            function o(e, t) {
                let n, r;
                switch (t) {
                    case "error":
                        n = "color: red",
                            r = "background: red; color: white";
                        break;
                    case "success":
                        n = "color: green",
                            r = "background: green; color: white";
                        break;
                    default:
                        n = "color: blue;",
                            r = "background: #000; color: #fff";
                }
                try {
                    let a = new Date;
                    console.debug("%c[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ":" + a.getMilliseconds() + "]%c " + e, r, n);
                } catch (i) {
                }
            }

            return {
                log: o
            };
        })

        .controller('QuestionModalController', ['$scope', '$mdDialog',
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
        .run(['UserModel', '$state', '$rootScope', '$http',
            function (UserModel, $state, $rootScope, $http) {

                $rootScope.$on('unauthorized',
                    () => {
                        $state.go('auth');
                    });

                if (!UserModel.getToken()) {
                    setTimeout(() => $state.go('auth'), 0);
                }
                $http.get('/user').success( (data) => {
                    UserModel.setData(data);
                });
            }]);
})();