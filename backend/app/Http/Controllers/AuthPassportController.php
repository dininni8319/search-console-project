<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthPassportController extends Controller
{
    public function register(Request $request) {
        
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|min:6|confirmed', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                  'success' => false,
                  'message' => $validator->messages()->toArray()
            ],400); //bad request
        }
        
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])->sendEmailVerificationNotification();

        $resposeMessage = "Registration Successful";

        return response()->json([
            'success' => true,
            'message' => $resposeMessage
        ],200);  //success
    }
    
    public function login(Request $request) {

        $validator = Validator::make($request->all(),[
            'email' => 'required|string|email',
            'password' => 'required|min:6', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                  'success' => false,
                  'message' => $validator->messages()->toArray()
            ],400); //bad request
        }

        $credentials = $request->only(['email', 'password']);

        $user = User::where('email', $credentials['email'])->first();
        
        if($user) {

            if ($user === null && !Hash::check($credentials['password'], $user['password'])) {
                $responseMessage = 'Invalid username or password';
                return response()->json([
                    'success' => false,
                    'message' => $responseMessage,
                    'error' => $responseMessage
                ], 422);
            }

            $accessToken = $user->createToken('authToken')->accessToken; 

            $responseMessage = "Login Successful";

            return response()->json([
                'success' => true,
                'message' => $responseMessage,
                'token' => $accessToken,
                'token_type' => 'bearer',  //al portatore
                'data' => auth()->user()
            ], 201); //success

        } else {

            $responseMessage = 'Sorry this user does not exist';
            
            return response()->json([

                'success' => false,
                'message' => $responseMessage,
                'error' => $responseMessage,

            ], 422); // utente non esistente // 422 Unprocessable Entity
        }
    }

    public function logout(){
        $user = Auth::guard('api')->user(); // the user must be authenticated 
        
        if (!$user) {

            $responseMessage = 'Invalid Bearer Token';

            return response()->json([

                'success' => false,
                'message' => $responseMessage,
                'error' => $responseMessage

            ], 403); //403 Forbidden
        }

        $token = $user->token();

        $token->revoke();

        $responseMessage = 'successfully logged out';

        return response()->json([
            'success' => true,
            'message' => $responseMessage
        ], 200);

    }
    
    public function viewProfile(){
        $user = Auth::guard('api')->user(); // the user must be authenticated 
        
        if (!$user) {

            $responseMessage = 'Invalid Bearer Token';

            return response()->json([
                'success' => false,
                'message' => $responseMessage,
                'error' => $responseMessage
            ], 403); //403 Forbidden
        }

        $responseMessage = 'user profile';

        return response()->json([
            'success' => true,
            'message' => $responseMessage,
            'data' => $user
        ], 200);

    }
}
