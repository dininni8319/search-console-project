<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends GoogleController
{
    public function getAuthUrl()
    {
        $client = GoogleController::getClient();

        $authUrl = $client->createAuthUrl();

        return response()->json($authUrl, 200);
    }

    public function postLogin(Request $request)
    {
        $authCode = urldecode($request->input('auth_code'));
        //Google client
        $client = GoogleController::getClient();
        
        //Exchange auth code for access token
        $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
        
        $client->setAccessToken(json_encode($accessToken));
        
        //Get the user data from google
        $service = new \Google\Service\Oauth2($client);
        $userFromGoogle = $service->userinfo->get();
        
        $user = User::where('provider_name', '=', 'google')
        ->where('provider_id', '=', $userFromGoogle->id)
        ->first();
        
        if (!$user) {
            $user = User::create([
                'provider_id' => $userFromGoogle->id,
                'provider_name' => 'google',
                'google_access_token_json' => json_encode($accessToken),
                'name' => $userFromGoogle->name,
                'email' => $userFromGoogle->email,  
                ]);
            } else {
                $user->google_access_token_json = json_encode($accessToken);
                $user->save();
            }
       /**
         * Log in and return token
         * HTTP 201
         */
        $token = $user->createToken('Google')->accessToken;
        return response()->json($token, 201);
    }
}
