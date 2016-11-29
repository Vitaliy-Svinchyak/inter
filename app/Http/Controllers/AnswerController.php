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
use App\Models\Answer;

/**
 * Class AnswerController
 * @package App\Http\Controllers
 */
class AnswerController extends Controller
{

    /**
     * @param Request $request
     * @return array
     */
    public function store(Request $request)
    {
        $input = $request->input();
        $answer = new Answer([
            'text' => $input['text'],
            'question_id' => $input['questionId']
        ]);
        $answer->save();
        $answer->load(['user']);
        return [
            'answer' => $answer
        ];
    }
}