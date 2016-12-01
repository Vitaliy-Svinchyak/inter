<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>IQA</title>

    <link href="/images/main-icon.png" rel="shortcut icon">
    <link rel="stylesheet" href="{{ asset('/css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet prefetch" href="{{ asset('/node_modules/angular-material/angular-material.min.css') }}">
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
</div>

<script src="{{ asset('/build/angular-full.js') }}"></script>
<script src='http://cdn.jsdelivr.net/g/angular.textangular@1.5.0(textAngular-rangy.min.js+textAngular-sanitize.min.js+textAngular.min.js)'></script>
<script src="{{ asset('/build/all.js') }}"></script>
</body>
</html>

