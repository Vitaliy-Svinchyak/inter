<?php

declare(strict_types = 1);

namespace App\Models;

use App\Essence\SaveModel;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\EloquentUserProvider;

/**
 * Class User
 * @property integer id
 * @property string email
 * @property string own_note
 * @property string password
 * @package App\Models
 */
class User extends SaveModel implements Authenticatable
{

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'own_note', 'password'
    ];

    /**
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users',
            'own_note' => 'string|max:255',
        ];
    }

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    /**
     * Will not use it
     * @return bool
     */
    public function getRememberToken()
    {
        return false;
    }

    /**
     * Will not use it
     * @return bool
     */
    public function setRememberToken($value)
    {

    }

    /**
     * Will not use it
     * @return bool
     */
    public function getRememberTokenName()
    {
        return 'token';
    }

}
