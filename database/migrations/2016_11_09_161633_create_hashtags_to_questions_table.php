<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHashtagsToQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hashtags_to_questions', function (Blueprint $table) {
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('hashtag_id');

            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('hashtag_id')->references('id')->on('hashtags');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('hashtags_to_questions');
    }
}
