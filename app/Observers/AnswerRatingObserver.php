<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 26.11.2016
 * Time: 22:21
 */
declare(strict_types = 1);

namespace App\Observers;

use Illuminate\Support\Facades\Auth;
use App\Models\AnswerRatingLog;
use App\Models\Answer;

class AnswerRatingObserver
{
    public function validating(AnswerRatingLog $model)
    {
        $model->user_id = Auth::id();
        $existRatingLog = AnswerRatingLog::where('user_id', $model->user_id)
            ->where('answer_id', $model->answer_id)
            ->first();

        if ($existRatingLog) {
            return false;
        }
        return true;
    }

    public function saved(AnswerRatingLog $model)
    {
        $answer = Answer::find($model->answer_id);
        if ($model->type === '+') {
            $answer->rating++;
        } else {
            $answer->rating--;
        }

        $answer->save();
        return true;
    }
}