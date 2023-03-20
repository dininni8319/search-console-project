<?php

namespace App\Models;

use App\Models\User;
use App\Models\Months;
use App\Models\Analitic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
      'project',
      'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function analitics()
    {
        return $this->hasMany(Analitic::class);
    }
    
    public function months()
    {
        return $this->hasMany(Months::class);
    }
}
