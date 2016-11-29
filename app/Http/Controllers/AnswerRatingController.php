<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 26.11.2016
 * Time: 22:10
 */
declare(strict_types = 1);
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnswerRatingLog;
use App\Models\Answer;

class AnswerRatingController extends Controller
{

    public function store(Request $request)
    {
        $input = $request->input();
        $answerRating = new AnswerRatingLog([
            'type' => $input['type'],
            'answer_id' => $input['answerId']
        ]);
        $answerRating->save();

        $newRating = Answer::find($answerRating->answer_id)->rating;

        return [
            'newRating' => $newRating
        ];
    }
}