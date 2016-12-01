<?php
declare(strict_types = 1);
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Lib\TagsCreator;

/**
 * Class QuestionController
 * @package App\Http\Controllers
 */
class QuestionController extends Controller
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $input = $request->all();
        $offset = ($input['page'] - 1) * 20;
        $type = $input['type'];
        $canLoadMore = false;
        $questionIds = DB::table('questions as q')
            ->join('hashtags_to_questions as hq', 'q.id', '=', 'hq.question_id')
            ->join('hashtags as h', 'hq.hashtag_id', '=', 'h.id')
            ->where('h.text', $type)
            ->take(21)
            ->orderBy('q.created_at', 'DESC')
            ->offset($offset)
            ->pluck('q.id');
        if ($questionIds->count() === 21) {
            $canLoadMore = true;
            $questionIds->pop();
        }

        $questions = Question::with([
            'user',
            'answers.user',
            'hashtags',
        ])
            ->whereIn('id', $questionIds)
            ->get();

        return [
            'questions' => $questions,
            'canLoadMore' => $canLoadMore
        ];
    }

    /**
     * @param Request $request
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $data['text'] = strip_tags($data['text']);
        $data['additional_text'] = strip_tags($data['additional_text'] ?? '');

        $question = new Question([
            'text' => $data['text'],
            'additional_text' => $data['additional_text'],
            'lvl' => $data['lvl'],
        ]);
        $result = $question->save();
        if ($result) {
            TagsCreator::addTagsToQuestion($data['tags'], $question->id);
            return response('');
        }

        $errors = [
            'errors' => $question->getErrors()->toArray()
        ];
        return response(json_encode($errors), 406);

    }
}
