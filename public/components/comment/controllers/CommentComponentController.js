/**
 * Created by opiru on 05.11.2016.
 */
class CommentComponentController {

}

const CommentComponentDefinition = {
    bindings: {
        'comment': '='
    },
    templateUrl: '/components/comment/templates/comment.html',

    // тут примерно так же как и в случае с директивами
    // единственное что `controllerAs` используется всегда
    // в случае если вы явно не прописали элиас для контроллера
    // будет использовано значение `$ctrl`.
    controller: CommentComponentController
}

angular.module('app').component('comment', CommentComponentDefinition);