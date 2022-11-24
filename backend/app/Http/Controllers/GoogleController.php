<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class GoogleController extends Controller
{
    protected function getClient()
    {
        $configJson = base_path() . '/config.json';
        $applicatinName = 'search_console';

        $client = new \Google_Client();
        $client->setApplicationName($applicatinName);
        $client->setAuthConfig($configJson);
        $client->setAccessType('offline');
        $client->setApprovalPrompt('force');

        $client->setScopes(
            [
                \Google\Service\Oauth2::USERINFO_PROFILE,
                \Google\Service\Oauth2::USERINFO_EMAIL,
                \Google\Service\Oauth2::OPENID,
                \Google\Service\SearchConsole::WEBMASTERS // allows reading of google drive metadata
            ]
        );

        $client->setIncludeGrantedScopes(true);

        return $client;
    }

    protected function getUserClient()
    {
        //get logged user

        // $user = User::where('id', '=', auth()->guard('api')->user()->id)->first();
        // il codice sopra e da rimettere quando l'app funziona
        $user = User::where('id', '=', '3')->first();

        /**
         * Strip slashes from the access token json
         * if you don't strip mysql's escaping, everything will seem to work
         * but you will not get a new access token from your refresh token
         */
        $accessTokenJson = stripslashes($user->google_access_token_json);

        $client = $this->getClient();
        $client->setAccessToken(($accessTokenJson));

        // Handle Refresh token
        if ($client->isAccessTokenExpired()) {
            //fetch new access token 
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            $client->setAccessToken($client->getAccessToken());

            // save new access token
            $user->google_access_token_json = json_encode($client->getAccessToken());
            $user->save();
        }

        return $client;
    }
}
