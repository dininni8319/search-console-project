<?php

namespace App\Models;

use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Analytic extends Model
{
    use HasFactory;

    protected $fillable = [
        'clicks',
        'impressions',
        'position',
        'ctr',
        'project_id',
    ];
    
    public function project()
    {
      return $this->belongsTo(Project::class);
    }
}
