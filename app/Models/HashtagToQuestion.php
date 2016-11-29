<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class User
 * @package App\Models
 */
class HashtagToQuestion extends SaveModel
{

    protected $table = 'hashtags_to_questions';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question_id', 'hashtag_id'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [

        ];
    }
}
