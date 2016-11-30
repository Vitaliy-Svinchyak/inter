<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class User
 * @property mixed answer_id
 * @package App\Models
 */
class QuestionRatingLog extends SaveModel
{

    protected $table = 'question_rating_log';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question_id', 'user_id', 'type'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'question_id' => 'required|Integer|exists:questions,id',
            'user_id' => 'required|Integer|exists:users,id',
            'type' => 'required|in:+,-',
        ];
    }
}
