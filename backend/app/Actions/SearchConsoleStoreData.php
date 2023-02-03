<?php

namespace App\Actions;

use Carbon\Carbon;
use App\Models\Project;
use \Google\Service\Webmasters;

class SearchConsoleStoreData 
{
  public function handleStoreData($client, $site)
  {
    $service = new Webmasters($client);
    $request = new Webmasters\SearchAnalyticsQueryRequest;
    $request->setStartRow(0);

    $dateNow = Carbon::now()->format('Y-m-d');
    $dateStart = Carbon::now()->subMonths(9)->format('Y-m-d');

    $request->setStartDate($dateStart);
    $request->setEndDate($dateNow);
    $request->setSearchType('web');
    $request->setRowLimit(5000);
    $request->setAggregationType('byProperty');// you can also query byPage or auto
    $request->setDimensions(array('date'));
    // $request->setDimensions(array('query','date', 'country','device','page'));
    $query_search = $service->searchanalytics->query('https://'.$site, $request); 
    $rows = $query_search->getRows();
    
    return $rows;
    
  }
}

