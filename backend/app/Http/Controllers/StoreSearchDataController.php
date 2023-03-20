<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\User;
use App\Models\Project;
use App\Models\Analitic;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Jobs\ProcessSearchConsoleData;
use App\Actions\SearchConsoleStoreData;

class StoreSearchDataController extends GoogleController
{
    public function __construct(){
      $this->middleware("auth:api");
    }
    
    public function storeData(SearchConsoleStoreData $action)
    {
      $client = GoogleController::getUserClient();
      $SevMonthsAgoDate = Carbon::now()->subMonths(17)->format('Y-m-d');
      $projects = Project::where('user_id', auth()->guard('api')->user()->id)->get();

      
      foreach ($projects as $key => $project) {
        $olderThan17Months = Analitic::where('project_id', $project->id)->where('date', '<=', $SevMonthsAgoDate)->get(); 
       
        if (count($olderThan17Months) === 0) {

          $analytic_rows = $action->handleStoreData($client, $project->project);
          ProcessSearchConsoleData::dispatch($analytic_rows, $project->id);

        }  else {
          $last = Analitic::where('project_id', $project->id)->orderBy('id', 'desc')->first();
          $date = $last->date;
          $addDay = new DateTime($date);
          $addDay->modify('+1 day');
          $addDay = $addDay ? date_format($addDay,'Y-m-d') : false;

          if ($addDay) {
            $analytic_rows = $action->handleStoreData($client, $project->project, $addDay);
            count($analytic_rows) ?? ProcessSearchConsoleData::dispatch($analytic_rows, $project->id);
          } else {
            return response()->json([
              'success' => false,
              'message' => "al momento non c'e sono nessun data!"
            ], 404);
          }
        }
      }
      
    }
}
