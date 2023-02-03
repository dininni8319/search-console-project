<?php

namespace App\Jobs;

use App\Models\Analitic;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ProcessSearchConsoleData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $rows;

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
        $rows = $this->rows;

        foreach ($rows as $key => $row) {

            $storeAnalitycs = Analitic::create([
                'clicks' => $row->clicks,
                'position' => $row->position,
                'ctr' => $row->ctr,
                'impressions' => $row->impressions,
                'date' => $row->keys[0],
                'project_id' => 48,
            ]);
        }
    }
}
