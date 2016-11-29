<?php
declare(strict_types = 1);
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 09.11.2016
 * Time: 19:26
 */

namespace App\Lib;

use App\Models\Role;
use App\Models\User;
use App\Models\UsersToRoles;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\Hash;

/**
 * Class UserCreator
 * @package App\Lib
 */
class UserCreator
{

    protected static $messageBag;

    public static function createMessageBag()
    {
        if (!(static::$messageBag instanceof MessageBag)) {
            static::$messageBag = new MessageBag();
        }
    }

    /**
     * Returns an array of errors
     * @return array
     */
    public static function getErrors() : MessageBag
    {
        return static::$messageBag;
    }

    /**
     * Adds a new a new error to the field
     * @param string $field
     * @param string $error
     */
    protected static function addError(string $field, string $error)
    {
        static::createMessageBag();
        static::$messageBag->add($field, $error);
    }

    /**
     * @param array $errors
     */
    protected static function addErrors(MessageBag $errors)
    {
        static::createMessageBag();
        static::$messageBag->merge($errors);
    }

    /**
     * @param array $userData
     * @return bool
     */
    public static function addToTheQueue(array $userData) : bool
    {
        if (!isset($userData['email'])) {
            static::addError('email', 'Заполните поле email.');
            return false;
        }
        $user = new User([
            'email' => $userData['email'],
            'own_note' => $userData['comment'] ?? '',
            'password' => Hash::make('123123')
        ]);
        if (!$user->save()) {
            $errors = $user->getErrors();
            static::addErrors($errors);
            return false;
        }
        $userRole = new UsersToRoles([
            'user_id' => $user->id,
            'role_id' => Role::BLINDMAN,
        ]);
        $userRole->save();

        return true;
    }

}