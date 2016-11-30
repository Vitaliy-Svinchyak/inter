/**
 * Created by opiru on 05.11.2016.
 */
;(function () {
    class QuestionComponentController {

        constructor($mdDialog, QuestionRatingService) {
            this.$mdDialog = $mdDialog;
            this.QuestionRatingService = QuestionRatingService;
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

        plus() {
            this.QuestionRatingService.create('+', this.question.id)
                .success(data => this.question.rating = data.newRating);
        }

        minus() {
            this.QuestionRatingService.create('-', this.question.id)
                .success(data => this.question.rating = data.newRating);
        }
    }

    const QuestionComponentDefinition = {
        bindings: {
            'question': '=',
        },
        templateUrl: '/components/question/templates/question.html',

        controller: ['$mdDialog', 'QuestionRatingService', QuestionComponentController]
    }

    angular.module('app').component('question', QuestionComponentDefinition);
})();