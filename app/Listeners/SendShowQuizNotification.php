<?php

namespace App\Listeners;

use App\Events\ShowQuiz;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendShowQuizNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ShowQuiz $event): void
    {
        //
    }
}
