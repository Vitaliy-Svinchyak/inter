<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Models\Role;

class InsertRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $roles = [
            [
                'name' => 'Слепец',
                'comment' => 'Не подтвержденный пользователь.'
            ],
            [
                'name' => 'Чтец',
                'comment' => 'Пользователь может читать ответы и вопросы.'
            ],
            [
                'name' => 'Писец',
                'comment' => 'Пользователь может создавать вопросы и ответы.'
            ],
            [
                'name' => 'На дуде игрец',
                'comment' => 'Модератор.'
            ],
        ];

        foreach($roles as $role){
            $roleObject = new Role($role);
            $roleObject->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
