<?php
declare(strict_types = 1);
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'IndexController@showIndex');

Route::post('/user/ask-for-account', 'UserController@addUserToTheQueue');
Route::post('/user/auth', 'UserController@auth');
Route::post('/user/exit', 'UserController@logout');
Route::resource('/user', 'UserController',
    ['only' => 'index']);

Route::resource('/question', 'QuestionController',
    ['only' => ['index', 'store']]);

Route::resource('/answer-rating', 'AnswerRatingController',
    ['only' => 'store']);

Route::resource('/question-rating', 'QuestionRatingController',
    ['only' => 'store']);

Route::resource('/answer', 'AnswerController',
    ['only' => 'store']);

