<?php
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 23.11.2016
 * Time: 20:24
 */
declare(strict_types = 1);

namespace App\Lib;

use App\Models\User;
use App\Models\UserAuth;
use Illuminate\Support\Facades\Hash;

/**
 * Class AuthManager
 * @package App\Lib
 */
class AuthManager
{
    protected static $userToken;
    protected static $user;

    /**
     * @param array $userData with email & password keys
     * @return bool
     */
    public static function authUser(array $userData) : bool
    {
        $user = User::where('email', $userData['email'])->first();
        if ($user) {
            static::$user = $user;
            $passwordMatches = Hash::check($userData['password'], $user->password);
            if ($passwordMatches) {
                static::$userToken = Hash::make($user->email . time());
                $userAuth = new UserAuth([
                    'user_id' => $user->id,
                    'token' => static::$userToken,
                ]);
                $userAuth->save();
                return true;
            }
        }
        return false;
    }

    /**
     * @return string
     */
    public static function getIdAndToken() : array
    {
        return [
            'id' => static::$user->id,
            'token' => static::$userToken,
        ];
    }

    /**
     * @return array
     */
    public static function getErrors() : array
    {
        return [
            'Email или пароль не соответствуют.'
        ];
    }
}