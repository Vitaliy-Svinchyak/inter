<?php
declare(strict_types = 1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Observers\AnswerRatingObserver;
use App\Models\AnswerRatingLog;
use App\Observers\AnswerObserver;
use App\Models\Answer;
use App\Observers\QuestionObserver;
use App\Models\Question;
use App\Observers\QuestionRatingObserver;
use App\Models\QuestionRatingLog;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        AnswerRatingLog::observe(AnswerRatingObserver::class);
        QuestionRatingLog::observe(QuestionRatingObserver::class);
        Answer::observe(AnswerObserver::class);
        Question::observe(QuestionObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
