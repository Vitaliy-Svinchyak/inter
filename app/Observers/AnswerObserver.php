<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 27.11.2016
 * Time: 13:54
 */
declare(strict_types = 1);
namespace app\Observers;

use App\Models\Answer;
use Illuminate\Support\Facades\Auth;

class AnswerObserver
{
    public function validating(Answer $answer)
    {
        if (!$answer->exists) {
            $answer->text = strip_tags($answer->text, $this->generate(['ul', 'ol', 'li', 'strong', 'p']));
            $answer->rating = 0;
            $answer->user_id = Auth::id();
            $answer->code = '';
        }
        return true;
    }

    private function generate($tags)
    {
        $generatedTags = '';

        foreach ($tags as $tag) {
            $generatedTags .= "<{$tag}>";
        }

        return $generatedTags;
    }
}