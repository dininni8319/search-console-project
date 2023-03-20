<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\ProcessSearchConsoleData;
use App\Actions\SearchConsoleStoreData;

class StoreSearchDataController extends GoogleController
{
    public function __construct(){
      $this->middleware("auth:api");
    }
    
    public function storeData(Request $request)
    {
      return;
    }
}
