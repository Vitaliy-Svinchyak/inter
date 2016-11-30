<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;
use App\Models\AnswerRatingLog;
use Illuminate\Support\Facades\Auth;

/**
 * Class User
 * @package App\Models
 */
class Answer extends SaveModel
{

    protected $table = 'answers';

    protected $appends = ['can_plus'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text', 'question_id'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|Integer|exists:users,id',
            'question_id' => 'required|Integer|exists:questions,id',
            'text' => 'required|string',
            'code' => 'string',
            'rating' => 'required|Integer',
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * Checks if it is not an answer of current user or if he didn't plussed it
     * @return bool
     */
    public function getCanPlusAttribute()
    {
        if ($this->user_id === Auth::id()) {
            return false;
        }

        $existRatingLog = AnswerRatingLog::where('answer_id', $this->id)
            ->where('user_id', Auth::id())
            ->first();
        if ($existRatingLog) {
            return false;
        }
        return true;
    }
}
