<?php

namespace App\Jobs;

use App\Models\Months;
use App\Models\Analitic;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
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
    protected $projectId;

    public function __construct($rows, $projectId)
    {
        $this->rows = $rows; 
        $this->projectId = $projectId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $rows = $this->rows;
        $projectId = $this->projectId;
        $SevMonthsAgoDate = Carbon::now()->subMonths(17)->format('Y-m-d');
       
        $olderThan17Months = Analitic::where('project_id', $projectId)->where('date', '<=', $SevMonthsAgoDate)->get(); 
        
        if (count($olderThan17Months) > 0) {
            $count = count($olderThan17Months);

            $performance = [
                "clicks" => 0,
                "impressions" => 0,
                "position" => 0,
                "ctr" => 0,
              ];
          
            foreach ($olderThan17Months as $key => $value) {
                $performance['clicks'] += $value['clicks'];
                $performance['impressions'] += $value['impressions'];
                $performance['position'] += $value['position'];
                $performance['ctr'] += $value['ctr'];
            }
          
            $performance['position'] = $performance['position'] / $count;
            $performance['ctr'] = ($performance['ctr'] / $count) * 100;
            
            $storeAnalitycs = Months::create([
                'clicks' => $performance['clicks'],
                'position' => $performance['position'],
                'ctr' => $performance['ctr'],
                'impressions' => $performance['impressions'],
                'date' => $SevMonthsAgoDate,
                'project_id' => $projectId,
            ]);
            
            Analitic::where('date', '<=', $SevMonthsAgoDate)->delete();

        } else {
            foreach ($rows as $key => $row) {
                $storeAnalitycs = Analitic::create([
                    'clicks' => $row->clicks,
                    'position' => $row->position,
                    'ctr' => $row->ctr,
                    'impressions' => $row->impressions,
                    'date' => $row->keys[0],
                    'project_id' => $projectId,
                ]);
            }   
        }
    }
}
