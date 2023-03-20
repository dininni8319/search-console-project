<?php

namespace App\Models;

use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Analitic extends Model
{
    use HasFactory;

    protected $fillable = [
        'clicks',
        'position',
        'ctr',
        'impressions',
        'project_id',
        'date',
    ];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
