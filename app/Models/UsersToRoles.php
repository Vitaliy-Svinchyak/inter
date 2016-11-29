<?php
declare(strict_types = 1);
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 09.11.2016
 * Time: 22:05
 */

namespace app\Models;

use app\Essence\SaveModel;


/**
 * Class UsersToRoles
 * @package app\Models
 */
class UsersToRoles extends SaveModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'role_id'
    ];

    public $timestamps = false;
}