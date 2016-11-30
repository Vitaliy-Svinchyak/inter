<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 28.11.2016
 * Time: 21:37
 */
declare(strict_types = 1);
namespace app\Observers;

use App\Models\Question;
use Illuminate\Support\Facades\Auth;

class QuestionObserver
{

    public function validating(Question $question)
    {
        if(!$question->exists) {
            $question->user_id = Auth::id();
            $question->code = '';
            $question->rating = 0;
        }
        return true;
    }
}