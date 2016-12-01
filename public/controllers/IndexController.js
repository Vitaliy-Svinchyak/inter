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
            this.dataLoaded = false;
            this.canLoadMore = false;

            this.getQuestions(true);
        }

        /**
         *
         * @param ignore bool - ignore or not canLoadMore parameter
         */
        getQuestions(ignore) {
            if (this.canLoadMore || ignore) {
                this.canLoadMore = false;
                this.QuestionService.get({page: this.page})
                    .success((data) => {
                        this.questions.push(...data.questions);
                        this.canLoadMore = data.canLoadMore;
                        this.dataLoaded = true;
                    });
            }
        }

        openMenu() {
            this.$mdSidenav('left').toggle();
        }

        loadMore() {
            this.page++;
            this.getQuestions(false);
        }
    }

    angular.module('app').controller('IndexController', ['$mdDialog', '$mdSidenav', '$http',
        'QuestionService', IndexController])
})();
