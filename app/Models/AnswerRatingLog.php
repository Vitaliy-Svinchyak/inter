<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class User
 * @property mixed answer_id
 * @package App\Models
 */
class AnswerRatingLog extends SaveModel
{

    protected $table = 'answer_rating_log';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'answer_id', 'user_id', 'type'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'answer_id' => 'required|Integer',
            'user_id' => 'required|Integer',
            'type' => 'required|in:+,-',
        ];
    }
}
