<?php
declare(strict_types = 1);
/**
 * Created by PhpStorm.
 * User: opiru
 * Date: 09.11.2016
 * Time: 21:58
 */

namespace App\Models;

use App\Essence\SaveModel;

/**
 * Class Role
 * @package app\Models
 */
class Role extends SaveModel
{
    const BLINDMAN = 1;

    protected $table = 'roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'comment'
    ];

    public $timestamps = false;
}