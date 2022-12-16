<?php

namespace App\Jobs;

use App\Models\Analytic;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ProcessGoogleAnalitycs implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $rows;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($rows)
    {
        $this->rows = $rows;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    { 
        foreach ($this->rows as $row) {
            
            Analytic::updateOrCreate([
                "clicks" => $row[0],
            ],
            [
                "clicks" => $row['clicks'],
                "impressions" => $row['impressions'],
                "position" => $row['position'],
                "ctr" => $row['ctr'],
                "project_id" => $row[4],
            ]);
        }
    }
}
