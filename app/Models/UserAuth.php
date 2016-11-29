<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class User
 * @package App\Models
 */
class UserAuth extends SaveModel
{

    protected $table = 'user_auth';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'token'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required|Integer',
            'token' => 'required|string|max:60',
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

}
