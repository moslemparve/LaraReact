<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/add/contact', [ContactController::class, 'create']);
Route::get('/get/contacts', [ContactController::class, 'index']);
Route::get('/get/contact/{id}',[ContactController::class, 'edit']);
Route::post('/update/contact/{id}', [ContactController::class, 'update']);
Route::get('/delete/{id}',[ContactController::class, 'destroy']);
Route::post('/check/email/{value}',[ContactController::class, 'checkEmail']);
Route::view('/{path?}', 'welcome');
Route::view('/{path?}/{id?}', 'welcome');
