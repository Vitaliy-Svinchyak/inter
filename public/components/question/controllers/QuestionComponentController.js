/**
 * Created by opiru on 05.11.2016.
 */
;(function () {
    class QuestionComponentController {

        constructor($mdDialog) {
            this.$mdDialog = $mdDialog;
        }

        showShortAnswer(questionNumber) {
            this.question.showAnswer = true;
        }

        openAnswers() {
            this.$mdDialog.show({
                controller: 'QuestionModalController',
                templateUrl: '/views/site/questionModal.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    question: this.question
                }
            });
        };
    }

    const QuestionComponentDefinition = {
        bindings: {
            'question': '=',
        },
        templateUrl: '/components/question/templates/question.html',

        controller: ['$mdDialog', QuestionComponentController]
    }

    angular.module('app').component('question', QuestionComponentDefinition);
})();