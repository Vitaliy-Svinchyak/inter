/**
 * Created by opiru on 29.11.2016.
 */
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
})();