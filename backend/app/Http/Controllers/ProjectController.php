<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api");
    }

    public function storeProject(Request $request)
    {
        $userId = auth()->guard('api')->user()->id;
        // dd($userId, $request->project, 'testing the project');
        
        $validator = Validator::make($request->all(),[
            'project' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
          ],400); //bad request
        } else if(!$validator->fails() && $userId) {

            $project = Project::create([
                'project' => $request->project,
                'user_id' => $userId,
            ]);

            if ($project) {
                return response()->json([
                    'success' => true,
                    'message' => 'Il progietto è stato creato!'
                ], 201);
            }
            return response()->json([
                'success' => false,
                'message' => 'Qualcosa è andato storto!'
          ],400);
        }
    }
}
