<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Inter</title>

    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet prefetch" href="{{ asset('/cdn/angular-material.css') }}">
    {{--<link rel="stylesheet prefetch"--}}
    {{--href="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.1/angular-material.css">--}}
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">
</head>
<body>
<div id="main" class="container">
    <div class="main-view">
        <div layout="column">
            <main-menu></main-menu>
            <div ui-view></div>
        </div>
    </div>

    <script src="{{ asset('/cdn/angular.js') }}"></script>
    <script src="{{ asset('/cdn/angular-animate.min.js') }}"></script>
    <script src="{{ asset('/cdn/angular-cookies.min.js') }}"></script>
    <script src="{{ asset('/cdn/angular-aria.min.js') }}"></script>
    <script src="{{ asset('/cdn/angular-messages.min.js') }}"></script>
    <script src="{{ asset('/cdn/angular-material.js') }}"></script>
    <script src="{{ asset('/cdn/angular-ui-router.js') }}"></script>
    <script src="{{ asset('/cdn/angular.textangular@1.5.0(textAngular-rangy.min.js+textAngular-sanitize.min.js+textAngular.min.js).js') }}"></script>

    {{--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>--}}
    {{--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>--}}
    {{--<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-cookies.min.js"></script>--}}
    {{--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>--}}
    {{--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>--}}
    {{--<script src="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.1/angular-material.js"></script>--}}
    {{--<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.js"></script>--}}
    {{--<script src='http://cdn.jsdelivr.net/g/angular.textangular@1.5.0(textAngular-rangy.min.js+textAngular-sanitize.min.js+textAngular.min.js)'></script>--}}


    <script src="{{ asset('/js/app.js') }}"></script>
    <script src="{{ asset('/config/routes.js') }}"></script>
    <script src="{{ asset('/bootstrap/main.js') }}"></script>
    <script src="{{ asset('/controllers/IndexController.js') }}"></script>
    <script src="{{ asset('/controllers/AuthController.js') }}"></script>
    <script src="{{ asset('/controllers/RegistrationController.js') }}"></script>
    <script src="{{ asset('/controllers/MyPageController.js') }}"></script>
    <script src="{{ asset('/controllers/CreateQuestionController.js') }}"></script>
    <script src="{{ asset('/controllers/MyMenuController.js') }}"></script>
    <script src="{{ asset('/controllers/QuestionModalController.js') }}"></script>
    <script src="{{ asset('/components/comment/controllers/CommentComponentController.js') }}"></script>
    <script src="{{ asset('/components/question/controllers/QuestionComponentController.js') }}"></script>
    <script src="{{ asset('/components/main-menu/controllers/MainMenuComponentController.js') }}"></script>
    <script src="{{ asset('/models/User.js') }}"></script>
    <script src="{{ asset('/services/QuestionService.js') }}"></script>
    <script src="{{ asset('/services/AnswerRatingService.js') }}"></script>
    <script src="{{ asset('/services/AnswerService.js') }}"></script>
    <script src="{{ asset('/services/Logger.js') }}"></script>
</body>
</html>