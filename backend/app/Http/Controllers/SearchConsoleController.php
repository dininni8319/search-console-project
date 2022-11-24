<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchConsoleController extends GoogleController
{

    public function getSearchConsoleData(Request $request)
    {
        // \Google\Service\Webmasters
        // $service = new \Google\Service\Webmasters\Resource\Sites
        $client = GoogleController::getUserClient();

        $service = new \Google\Service\Webmasters($client);
        
        $request = new \Google\Service\Webmasters\SearchAnalyticsQueryRequest;
        
        $request->setStartRow(0);
        $request->setStartDate('2022-11-01');
        $request->setEndDate('2022-11-15');
        $request->setSearchType('web');
        $request->setRowLimit(30);
        // $request->setDimensions(array('query','country','device','date','page'));
        $request->setDimensions(array('date', 'country','device','page'));
        // $query_search = $service->searchanalytics->query("https://www.masserialatofala.it/", $request); 
        $query_search = $service->searchanalytics->query("https://www.esperienzelocal.com", $request); 
        $rows = $query_search->getRows();
        
        return $rows;  
    }

    public function getSite()
    {
        $client = GoogleController::getUserClient();

        $service = new \Google\Service\Webmasters($client);
        
        $allWebSites = $service->sites->listSites()->siteEntry;
        
        // dd($allWebSites, 'testing');
        $allWebSites = $allWebSites[1]->siteUrl;
        
        return response()->json($allWebSites, 200);
    }

    // needs to be fixed
    public function addProperty(Request $request)
    {
        if ($request->site) {
            $client = GoogleController::getUserClient();

            $service = new \Google\Service\Webmasters($client);
            $addSite = $service->sites->add($request->site);

            // $request = $service->site->addProperty('https://salvatore-dininni.com');
            
            return response()->json($addSite, 201); ;
        }

        $msg = 'You must add a site!';
        return response()->json($msg,404);
    }
}
