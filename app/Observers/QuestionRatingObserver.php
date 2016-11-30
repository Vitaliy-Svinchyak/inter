<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 30.11.2016
 * Time: 22:21
 */
declare(strict_types = 1);

namespace App\Observers;

use Illuminate\Support\Facades\Auth;
use App\Models\QuestionRatingLog;
use App\Models\Question;

class QuestionRatingObserver
{
    public function validating(QuestionRatingLog $model)
    {
        if (!$model->exists) {
            $model->user_id = Auth::id();
            $existRatingLog = QuestionRatingLog::where('user_id', $model->user_id)
                ->where('question_id', $model->question_id)
                ->first();

            if ($existRatingLog) {
                return false;
            }
        }
        return true;
    }

    public function saved(QuestionRatingLog $model)
    {
        $question = Question::find($model->question_id);
        if ($model->type === '+') {
            $question->rating++;
        } else {
            $question->rating--;
        }

        $question->save();

        return true;
    }
}