<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLvlsToQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lvls_to_questions', function (Blueprint $table) {
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('lvl_id');

            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('lvl_id')->references('id')->on('lvls');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('lvls_to_questions');
    }
}
