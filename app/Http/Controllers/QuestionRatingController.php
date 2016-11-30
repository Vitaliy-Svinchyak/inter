<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 30.11.2016
 * Time: 22:10
 */
declare(strict_types = 1);
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionRatingLog;
use App\Models\Question;

class QuestionRatingController extends Controller
{

    public function store(Request $request)
    {
        $input = $request->input();
        $questionRating = new QuestionRatingLog([
            'type' => $input['type'],
            'question_id' => $input['questionId']
        ]);
        $questionRating->save();

        $newRating = Question::find($questionRating->question_id)->rating;

        return [
            'newRating' => $newRating
        ];
    }
}