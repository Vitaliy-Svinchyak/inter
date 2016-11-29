<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class User
 * @package App\Models
 */
class Hashtag extends SaveModel
{

    protected $table = 'hashtags';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'text',
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
