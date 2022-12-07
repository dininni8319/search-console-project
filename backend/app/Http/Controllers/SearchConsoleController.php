<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Project;
use Illuminate\Http\Request;
use \Google\Service\Webmasters;

class SearchConsoleController extends GoogleController
{
    public function __construct(){
        // $this->middleware("auth:api");
        $this->middleware("auth:api");
    }
    
    public function getSearchConsoleData(Request $request)
    {
        // $service = new \Google\Service\Webmasters\Resource\Sites
        $client = GoogleController::getUserClient();
        $service = new Webmasters($client);
        $request = new Webmasters\SearchAnalyticsQueryRequest;
        
        $request->setStartRow(0);
        $request->setStartDate('2022-11-01');
        $request->setEndDate('2022-11-15');
        $request->setSearchType('web');
        $request->setRowLimit(30);
        // $request->setDimensions(array('query','country','device','date','page'));
        $request->setDimensions(array('query', 'date', 'country','device','page'));
        $query_search = $service->searchanalytics->query("https://www.esperienzelocal.com", $request); 
        $rows = $query_search->getRows();
         
        if (!$rows) {
            return response()->json([
                'success' => false,
                'message' => 'Non ho trovato nessun sito!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $rows,
            'message' => 'Questi sono i siti trovati'
          ], 200);    
    }

    public function getSearchConsoleWeekData($site)
    {
        $client = GoogleController::getUserClient();
        $service = new Webmasters($client);
        $request = new Webmasters\SearchAnalyticsQueryRequest;
        
        $request->setStartRow(0);
        $dateNow = Carbon::now()->format('Y-m-d');
        $twoWeeksBefore = Carbon::now()->subDays(7)->format('Y-m-d');
        $request->setStartDate($twoWeeksBefore);
        $request->setEndDate($dateNow);
        $request->setSearchType('web');
        $request->setRowLimit(30);
        
        $request->setDimensions(array('date', 'country','device','page'));
        $query_search = $service->searchanalytics->query('https://'.$site, $request); 
        
        $rows = $query_search->getRows();
        
        if (!$rows) {
            return response()->json([
                'success' => false,
                'message' => 'Non ho trovato nessun sito!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $rows,
            'message' => 'Questi sono i siti trovati'
          ], 200);  
    }
    
    public function getSite()
    {
        $userId = auth()->guard('api')->user()->id;

        $client = GoogleController::getUserClient();
        
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

        // dd($newSites, $sites);
        if ($sites) {
            return response()->json([
              'success' => true,
              'data' => $newSites,
              'message' => 'Questi sono i siti trovati'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Non ho trovato nessun sito!'
            ], 400);
        }
    }

    //needs to be fixed, is not working jet
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
