<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\AuthPassportController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\SearchConsoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'CORS'],function ($router){
    //login with passport
    Route::post('/register', [AuthPassportController::class, 'register']);
    Route::post('/login', [AuthPassportController::class, 'login']);
    
    //Private Route
    Route::get('/view-profile', [AuthPassportController::class, 'viewProfile'])->name('profile.user');
    Route::post('/logout', [AuthPassportController::class, 'logout'])->name('logout.user');
    Route::get('/email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
    
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
    });
    
    Route::get('/home', function () {
        return response()->json('Hello world', 200);
    });

    //login with google
    Route::get('google/login/url', [AuthController::class, 'getAuthUrl']);
    Route::post('google/auth/login', [AuthController::class, 'postLogin']);

    //search console
    Route::get('/search/console/allsites', [SearchConsoleController::class, 'getSite']);
    Route::get('/search/console/delete/{id}', [SearchConsoleController::class, 'deleteProperty']);
    Route::get('/search/console/weekly_data/{site}', [SearchConsoleController::class, 'getSearchConsoleWeekData']);
    Route::post('/google/search/console/analytics', [SearchConsoleController::class, 'getSearchConsoleData']);
    //not working jet
    Route::post('/search/console/addProperty', [SearchConsoleController::class, 'addProperty']);
    
    //project
    Route::post('/search/console/new_project', [ProjectController::class, 'storeProject']);
    Route::get('/search/console/all_projects', [ProjectController::class, 'getAllProjects']);
});
   


