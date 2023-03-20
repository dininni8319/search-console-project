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
                    'message' => 'Il progetto è stato creato!'
                ], 201);
            }
            return response()->json([
                'success' => false,
                'message' => 'Qualcosa è andato storto!'
          ],400);
        }
    }

    public function getAllProjects()
    {
        $userId = auth()->guard('api')->user()->id;

        if ($userId) {
           
            $projects = Project::where('user_id', $userId)->get();

            $newProjects = [];

            foreach ($projects as $key => $value) {
                array_push($newProjects, $value);
            }

            if ($projects) {
                return response()->json([
                    'success' => true,
                    'message' => 'Questi sono i progetti che ho trovato!',
                    'data' => $newProjects
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'Non ho trovato nessun progetto!'
          ],404);
        } 
    }

    public function deleteProperty($id)
    {
        $userId = auth()->guard('api')->user()->id;
        $project = Project::where('user_id', $userId)->find($id);

        if ($id && $project) {
            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'Il progetto è stato eliminato'
              ], 200);
        }
        return response()->json([
            'success' => false,
            'message' => 'Non ho trovato nessun progetto!'
        ], 404);
    }
}
