/**
 * Created by opiru on 07.11.2016.
 */
;(function () {
    'use strict';

    class CreateQuestionController {

        constructor($mdSidenav, QuestionService) {
            this.$mdSidenav = $mdSidenav;
            this.QuestionService = QuestionService;
            this.tagsString = '';
            this.question = {
                question: '',
                tags: []
            };
        }

        openMenu() {
            this.$mdSidenav('left').toggle();
        }

        parseTags() {
            let position = this.tagsString.indexOf(',');
            if (position > 0) {
                let tag = this.tagsString.substr(0, position).trim();
                if (this.question.tags.indexOf(tag) === -1) {
                    this.question.tags.push(tag);
                }
                this.tagsString = '';
            }
        };

        deleteTag(toDeleteIndex) {
            let newTags = [];
            for (let localTagIndex in this.question.tags) {
                if (this.question.tags.hasOwnProperty(localTagIndex)
                    && localTagIndex != toDeleteIndex) {
                    newTags.push(this.question.tags[localTagIndex]);
                }

            }
            this.question.tags = newTags;
        };

        saveQuestion(questionForm) {
            if (questionForm.$valid) {
                this.QuestionService.create(this.question)
                    .success(data => {

                    });
            }
        }
    }

    angular.module('app').controller('CreateQuestionController', ['$mdSidenav', 'QuestionService',
        CreateQuestionController])
})();