<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class User
 * @package App\Models
 */
class Question extends SaveModel
{

    protected $table = 'questions';

    protected $appends = ['bestAnswer'];
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

    public function hashtags()
    {
        return $this->belongsToMany(Hashtag::class, 'hashtags_to_questions', 'question_id', 'hashtag_id');
    }
}
