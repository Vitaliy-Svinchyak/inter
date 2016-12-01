;
(function () {
    'use strict';
    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'textAngular',
        'ngCookies',
    ]).config(['$mdThemingProvider',
        function ($mdThemingProvider) {

            // $mdThemingProvider.definePalette('fiolet', {
            //     '50': '#532E57',
            //     '100': '#532E57',
            //     '200': '#532E57',
            //     '300': '#532E57',
            //     '400': '#532E57',
            //     '500': '#532E57',
            //     '600': '#532E57',
            //     '700': '#532E57',
            //     '800': '#532E57',
            //     '900': '#532E57',
            //     'A100': '#ffffff',
            //     'A200': '#8e8e8e',
            //     'A400': '#8e8e8e',
            //     'A700': '#8e8e8e',
            //     'contrastDefaultColor': 'light',
            //     'contrastLightColors': ['70', 'A200'],
            // });
            //
            // $mdThemingProvider.theme('default')
            //     .primaryPalette('fiolet')
            //     .accentPalette('grey');

        }
    ]).constant("$MD_THEME_CSS", "");

})();
/**
 * Created by opiru on 01.12.2016.
 */
;(function () {
    "use strict";
    window.addEventListener('scroll', (e) => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollHeight = window.document.body.scrollHeight;
        let clientWindowSize = window.document.body.clientHeight;
        if (scrollHeight - (scrollTop + clientWindowSize) < clientWindowSize) {
            let button = document.getElementById('load-more');
            if (button) {
                button.click();
                console.log('click');
            }
        }
    });
})();

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
;(function () {
    'use strict';
    angular.module('app')
        .factory('IQAHttpInterceptor', ['$q', '$rootScope', 'UserModel', 'Logger',
            function ($q, $rootScope, UserModel, Logger) {
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
                        Logger.log('Request failer.', 'error');
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
                        Logger.log('Response error.', 'error');
                        return $q.reject(rejection);
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
                $http.get('/user').success((data) => {
                    UserModel.setData(data);
                });
            }]);
})();
/**
 * Created by opiru on 04.11.2016.
 */

;(function () {
    'use strict';

    class AuthController {

        constructor($http, $location, UserModel) {
            this.$http = $http;
            this.$location = $location;
            this.UserModel = UserModel;
            this.email = '';
            this.password = '';
        }

        login(authForm) {
            if (authForm.$valid) {
                this.$http.post('/user/auth',
                    {
                        email: this.email,
                        password: this.password,
                        window: {
                            height: window.height,
                            width: window.width,
                        }
                    }).success((data) => {
                    this.UserModel.setData(data);
                    this.$location.url('/main/php');
                });
            }
        }
    }

    angular.module('app').controller('AuthController', ['$http', '$location',
        'UserModel', AuthController])
})();
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

/**
 * Created by opiru on 07.11.2016.
 */
;(function () {
    'use strict';
    angular.module('app')
    //Controller for everything with hashes
        .controller('MyMenuController', ['$scope', '$location',
            function ($scope, $location) {

                $scope.go = function (to) {
                    $location.url('/my/' + to);
                };

            }])
})();
/**
 * Created by opiru on 07.11.2016.
 */

;(function () {
    'use strict';

    class MyPageController {

        constructor($mdSidenav) {
            this.$mdSidenav = $mdSidenav;
        }

        openMenu() {
            this.$mdSidenav('left').toggle();
        }
    }

    angular.module('app').controller('MyPageController', ['$mdSidenav',
        MyPageController])
})();
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
            $scope.answerObject = {};
            $scope.showAnswerForm = false;
            if (!$scope.question.answers.length) {
                $scope.showAnswerForm = true;
            }


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

/**
 * Created by opiru on 04.11.2016.
 */
;(function () {
    'use strict';

    class RegistrationController {

        constructor($http) {
            this.$http = $http;
            this.email = '';
            this.comment = '';
        }

        register(registerForm) {
            if (registerForm.$valid) {
                this.$http.post('/user/ask-for-account',
                    {
                        email: this.email,
                        comment: this.comment,
                        window: {
                            height: window.height,
                            width: window.width,
                        }
                    });
            }
        }
    }

    angular.module('app').controller('RegistrationController', ['$http', RegistrationController])
})();
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
/**
 * Created by opiru on 05.11.2016.
 */
class MainMenuComponentController {

    /**
     *
     * @param $mdSidenav
     * @param $location
     */
    constructor($mdSidenav, $location) {
        this.$mdSidenav = $mdSidenav;
        this.$location = $location;

        this.isHome = true;
        this.isMyPage = false;

        this.menuItemsMain = [
            {
                url: '/main/php',
                icon: '/images/php.png',
                alt: 'PHP',
                text: 'PHP',
            },
            {
                url: '/main/js',
                icon: '/images/js.png',
                alt: 'JS',
                text: 'JS',
            },
            {
                url: '/main/mysql',
                icon: '/images/mysql.png',
                alt: 'MYSQL',
                text: 'MYSQL',
            },
            {
                url: '/main/css',
                icon: '/images/css3.png',
                alt: 'CSS',
                text: 'CSS',
            },
            {
                url: '/main/html',
                icon: '/images/html.png',
                alt: 'HTML',
                text: 'HTML',
            },
        ];
        this.menuItemsMy = [
            {
                url: '/my/create-question',
                text: 'Создать вопрос',
            },
        ];
        this.detectPage();
    }


    openMenu() {
        this.$mdSidenav('left').toggle();
    }

    /**
     * Goes to the url and closes menu
     * @param to
     */
    go(to) {
        this.$location.url(to);
        this.$mdSidenav('left').toggle();
    }

    /**
     * Detects pages and changes menu items
     */
    detectPage() {
        let path = this.$location.path();
        if (path.substr(0, 4) === '/my/'){
            this.setMyPageSettings();
        }
        else{
            this.setHomePageSettings();
        }
    }

    setMyPageSettings() {
        this.menuItems = this.menuItemsMy;
        this.isHome = false;
        this.isMyPage = true;
    }

    goMyPage() {
        this.setMyPageSettings();
        this.$location.url('/my/page');
    }

    setHomePageSettings() {
        this.menuItems = this.menuItemsMain;
        this.isHome = true;
        this.isMyPage = false;
    }

    goHomeNigger() {
        this.setHomePageSettings();
        this.$location.url('/main/php');
    }
}

const MainMenuDefinition = {
    templateUrl: '/components/main-menu/templates/menu.html',

    controller: MainMenuComponentController
};

angular.module('app').component('mainMenu', MainMenuDefinition);
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
/**
 * Created by opiru on 23.11.2016.
 */

;(function () {
    'use strict';

    class User {

        constructor($cookies) {
            this.$cookies = $cookies;
        }

        setData(userData) {
            this.data = userData;
            if (this.data.token) {
                this.$cookies.put('token', this.data.token);
            }
        }

        getToken() {
            let cookieToken = this.$cookies.get('token');
            if (cookieToken) {
                return cookieToken;
            }
            if (this.data) {
                return this.data.token;
            }
            return false;
        }

        getId() {
            if (this.data) {
                return this.data.id;
            }
            return false;
        }

        getData() {
            return this.data;
        }
    }

    angular.module('app').factory('UserModel', ['$cookies', User])
})();
/**
 * Created by opiru on 26.11.2016.
 */
;(function () {
    'use strict';

    class AnswerRatingService {

        constructor($http) {
            this.$http = $http;
        }

        /**
         *
         * @param ENUM [+, -] type
         * @param int answerId
         * @returns {*}
         */
        create(type, answerId) {
            return this.$http.post('/answer-rating', {
                type: type,
                answerId: answerId
            });
        }
    }

    angular.module('app').factory('AnswerRatingService', ['$http',
        AnswerRatingService])
})();
/**
 * Created by opiru on 27.11.2016.
 */
;(function () {
    'use strict';

    class AnswerService {

        constructor($http) {
            this.$http = $http;
        }

        /**
         *
         * @param object answerObject
         * @param int questionId
         * @returns {*}
         */
        create(answerObject, questionId) {
            answerObject.questionId = questionId;
            return this.$http.post('/answer', answerObject);
        }
    }

    angular.module('app').factory('AnswerService', ['$http',
        AnswerService])
})();
/**
 * Created by opiru on 26.11.2016.
 */
;(function () {
    'use strict';

    class Logger {

        constructor($log) {
            this.$log = $log;
        }

        log(e, t) {
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
            let a = new Date;
            this.$log.debug("%c[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ":" + a.getMilliseconds() + "]%c " + e, r, n);
        }
    }

    angular.module('app').factory('Logger', ['$log',
        Logger])
})();
/**
 * Created by opiru on 30.11.2016.
 */
;(function () {
    'use strict';

    class QuestionRatingService {

        constructor($http) {
            this.$http = $http;
        }

        /**
         *
         * @param type ENUM [+, -]
         * @param questionId int
         * @returns {*}
         */
        create(type, questionId) {
            return this.$http.post('/question-rating', {
                type: type,
                questionId: questionId
            });
        }
    }

    angular.module('app').factory('QuestionRatingService', ['$http',
        QuestionRatingService])
})();
/**
 * Created by opiru on 26.11.2016.
 */
;(function () {
    'use strict';

    class QuestionService {

        constructor($http, $stateParams) {
            this.$http = $http;
            this.$stateParams = $stateParams;
        }

        get(options) {
            options.type = this.$stateParams.category;

            let params = '';
            for (let option in options) {
                if (options.hasOwnProperty(option)) {
                    params += `${option}=${options[option]}&`;
                }
            }
            params = params.substr(0, params.length - 1);

            return this.$http.get(`/question?${params}`);
        }

        create(question) {
            return this.$http.post('/question', question);
        }
    }

    angular.module('app').factory('QuestionService', ['$http', '$stateParams',
        QuestionService])
})();