<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Services\PDFImageExtractorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResourceMaterialController extends Controller
{
    public function manageResourceMaterial(Request $request)
    {
        return Inertia::render('Modules/ResourceMaterial/ManageResourceMaterial', [
            "test" => "student",
        ]);
    }

    public function saveResourceMaterial(Request $request)
    {
        $extractorService = new PDFImageExtractorService();
        $validated = $request->validate([
            'name' => 'required|unique:groups|max:50',
            'date' => 'required',
        ]);

        $fileUploadDate = $request->get('date');
        $fileName = $request->get('name');
        $fileDescription = $request->get('description');
        $pageNumber = 1;
        $resourceMaterialSaveDirectory = '/files/resource_materials/';
        $uploadedFilepath = Storage::disk('public')->putFile($resourceMaterialSaveDirectory, $request->file('file_uploaded')[0]);
     
        $pageImage = $extractorService->extractPageImage($uploadedFilepath, $pageNumber);


        // $savedFileId = DB::table('resource_files')->insert([
        //     'group_id' => $savedGroupId,
        //     'user_id' => $studentId,
        //     'created_at' => Carbon::now()
        // ]);


        // if ($request->hasFile('profile_pic')) {

        //     $name = $file->getClientOriginalName();
        //     $extension = $file->getClientOriginalExtension();
        //     $uploadedFilePath = Storage::disk('public')->put("/files/$savedGroupId/group_icon", $file);
        //     $uploadedFilePathArray = explode('/', $uploadedFilePath);
        //     $group_details['group_icon'] =   end($uploadedFilePathArray);
        //     $savedGroup->group_icon = $group_details['group_icon'];
        //     $savedGroup->save();
        // }

        // return response()->json(["status" => "success"], 200);
    }
}
