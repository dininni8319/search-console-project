<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Project;
use Illuminate\Http\Request;
use \Google\Service\Webmasters;
use App\Actions\SearchConsoleAnalyticsAction;

class SearchConsoleController extends GoogleController
{
    public function __construct(){
        $this->middleware("auth:api");
    }
    
    public function getSearchConsoleData(Request $request, SearchConsoleAnalyticsAction $action)
    {
        $client = GoogleController::getUserClient();
        $rows = $action->handle($client, $request->site, $request->start, $request->end, $request->num);
        
        if (!$rows) {
            return response()->json([
                'success' => false,
                'message' => 'Non ho trovato nessun sito!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $rows['rows'],
            'performance' => $rows['performance'],
            'count' => $rows['count'],
            'message' => 'Questi sono i siti trovati'
          ], 200);    
    }

    public function getSearchConsoleWeekData($site, SearchConsoleAnalyticsAction $action)
    {
        $client = GoogleController::getUserClient();
        $rows = $action->handle($client, $site);

        if (!$rows) {
            return response()->json([
                'success' => false,
                'message' => 'Non ho trovato nessun sito!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $rows['rows'],
            'performance' => $rows['performance'],
            'count' => $rows['count'],
            'message' => 'Questi sono i dati che ho trovato',
          ], 200);  
    }
    
    public function getSite(SearchConsoleAnalyticsAction $action)
    {
        $client = GoogleController::getUserClient();
        
        $newSites = $action->handleSites($client);

        if ($newSites) {
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