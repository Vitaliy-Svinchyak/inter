<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 28.11.2016
 * Time: 21:28
 */
declare(strict_types = 1);
namespace App\Lib;

use App\Models\Hashtag;
use App\Models\HashtagToQuestion;

class TagsCreator
{

    public static function createTags(array $tags, int $questionId)
    {
        foreach ($tags as $tag) {
            $tagDb = Hashtag::firstOrCreate(['text' => $tag]);
            HashtagToQuestion::firstOrCreate(['question_id' => $questionId, 'hashtag_id' => $tagDb->id]);
        }
    }
}