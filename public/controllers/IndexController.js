/**
 * Created by opiru on 05.11.2016.
 */

;(function () {
    'use strict';

    class IndexController {


        constructor($mdDialog, $mdSidenav, $http, QuestionService) {
            this.$mdDialog = $mdDialog;
            this.$mdSidenav = $mdSidenav;
            this.$http = $http;
            this.QuestionService = QuestionService;

            this.page = 1;
            this.questions = [];

            this.getQuestions(this.page);
        }

        getQuestions(page) {
            this.QuestionService.get({page : page})
                .success((data) => this.questions = data);
        }

        openMenu() {
            this.$mdSidenav('left').toggle();
        }
    }

    angular.module('app').controller('IndexController', ['$mdDialog', '$mdSidenav', '$http',
        'QuestionService', IndexController])
})();
