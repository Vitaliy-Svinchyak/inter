/**
 * Created by opiru on 26.11.2016.
 */

;(function () {
    'use strict';

    class QuestionModalController {

        constructor($mdDialog, User, question) {
            this.$mdDialog = $mdDialog;
            this.User = User;
            this.question = question;

            this.commentsOpened = false;
            this.showAnswerForm = false;
            this.answerText = '';
        }

        hide() {
            this.$mdDialog.hide();
        };

        cancel() {
            this.$mdDialog.cancel();
        };

        close() {
            this.$mdDialog.hide();
        };

        answer() {
            this.showAnswerForm = true;
        };

        showComments() {
            this.commentsOpened = true;
        };

        // plus(answerId) {
        //     AnswerRatingService.create('+', answerId);
        // }
        //
        // minus(answerId) {
        //     AnswerRatingService.create('-', answerId);
        // }
    }

    angular.module('app').controller('QuestionModalController', ['$mdDialog',
        'UserModel', 'question',
        QuestionModalController]);
})();
