<?php

namespace App\Actions;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Project;
use \Google\Service\Webmasters;
use App\Jobs\ProcessGoogleAnalitycs;

class SearchConsoleAnalyticsAction 
{
  public function handle($client, $site, $dateStart = null, $dateEnd = null, $num = null)
  {
    $userId = auth()->guard('api')->user()->id;
    
    $service = new Webmasters($client);
    $request = new Webmasters\SearchAnalyticsQueryRequest;
    $request->setStartRow(0);

    $dateNow = Carbon::now()->format('Y-m-d');
   
    $Months = Carbon::now()->subMonths(16)->format('Y-m-d');

    $request->setStartDate($dateStart ? $dateStart : $Months);
    $request->setEndDate($dateEnd ? $dateEnd : $dateNow);
    $request->setSearchType('web');
    $request->setRowLimit(5000);
    $request->setAggregationType('byProperty');// you can also query byPage or auto
    $request->setDimensions(array('date'));
      // $request->setDimensions(array('query','date', 'country','device','page'));
    $query_search = $service->searchanalytics->query('https://'.$site, $request); 
    $rows = $query_search->getRows();
    
    // $getProjectId = Project::where('user_id', '=', $userId); 
    // dd($getProjectId, 'testing the login user');
    ProcessGoogleAnalitycs::dispatch($rows);  
    
    $performance = [
      "clicks" => 0,
      "impressions" => 0,
      "position" => 0,
      "ctr" => 0,
    ];
  
      $count = count($rows);
  
      foreach ($rows as $key => $value) {

        $performance['clicks'] += $value['clicks'];
        $performance['impressions'] += $value['impressions'];
        $performance['position'] += $value['position'];
        $performance['ctr'] += $value['ctr'];
      }
  
      $performance['position'] = $performance['position'] / $count;
      $performance['ctr'] = ($performance['ctr'] / $count) * 100;
  
      $data = collect([
        'rows' => $rows,
        'performance' => $performance,
        'count' => $count,
      ]);
      return $data;
    
  }

  public function handleSites($client){
      
    $userId = auth()->guard('api')->user()->id;
    $service = new \Google\Service\Webmasters($client);
    
    $allWebSites = $service->sites->listSites()->siteEntry;
    
    $sites = [];

    foreach ($allWebSites as $key => $value) {
      array_push($sites, $allWebSites[$key]->siteUrl);
    }

    $projects = Project::where('user_id', $userId)->get()->toArray();
    
    $newProjects = [];

    foreach ($projects as $key => $value) {
      array_push( $newProjects, $value['project']);
    }

    $newSites = array_diff($sites, $newProjects);

    return $newSites;
  } 
}

