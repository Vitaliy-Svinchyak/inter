<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;
use Illuminate\Support\Facades\Auth;

/**
 * Class User
 * @package App\Models
 */
class Question extends SaveModel
{

    protected $table = 'questions';

    protected $appends = ['best_answer', 'can_plus'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text', 'additional_text', 'lvl'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|Integer|exists:users,id',
            'text' => 'required|string|max:255|min:5',
            'additional_text' => 'string|max:255',
            'lvl' => 'required|Integer|in:0,1,2',
            'rating' => 'required|Integer',
        ];
    }

    /**
     * Finds answer with the best rating
     * @return null|Answer
     */
    public function getBestAnswerAttribute()
    {
        return $this->answers->first();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class, 'question_id', 'id')->orderBy('rating', 'DESC');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function hashtags()
    {
        return $this->belongsToMany(Hashtag::class, 'hashtags_to_questions', 'question_id', 'hashtag_id');
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

        $existRatingLog = QuestionRatingLog::where('question_id', $this->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existRatingLog) {
            return false;
        }
        return true;
    }
}
