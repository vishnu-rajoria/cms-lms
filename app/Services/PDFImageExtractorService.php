<?php

namespace App\Services;

use Imagick;
use ImagickDraw;
use ImagickPixel;
use Exception;
use Illuminate\Support\Facades\Storage;

class PDFImageExtractorService
{
    protected $outputDisk = 'public';
    protected $outputPath = 'pdf-images/';

    public function extractImagesFromPDF(string $pdfPath)
    {
        try {
            // Ensure storage path exists
            Storage::disk($this->outputDisk)->makeDirectory($this->outputPath);

            $imagick = new Imagick($pdfPath);
            print_r($imagick);
            $extractedImages = [];

            foreach ($imagick as $pageIndex => $page) {
                $page->setImageFormat('png');

                $filename = 'page_' . ($pageIndex + 1) . '_' . uniqid() . '.png';
                $fullPath = $this->outputPath . $filename;

                // Save to public disk
                $page->writeImage(storage_path('app/public/' . $fullPath));

                $extractedImages[] = [
                    'path' => $fullPath,
                    'url' => asset('storage/' . $fullPath)
                ];
            }

            return $extractedImages;
        } catch (Exception $e) {
            report($e);
            return [];
        }
    }

    public function extractPageImage(string $pdfPath, int $pageNumber)
    {

        // Path to the PDF file
        // $uploadedFilePath = Storage::disk('public')->put($profile_pic_save_directory, $imageBlob);
        // $pdfPath = storage_path($pdfPath);

        // echo "pdfPath: " . $pdfPath . "<br>";
        // echo "pageNumber: " . $pageNumber . "<br>";
        // // try {
        // Storage::disk($this->outputDisk)->makeDirectory($this->outputPath);

        $imagick = new Imagick(""$pdfPath . '[' . ($pageNumber) . ']');
        $imagick->setImageFormat('png');

        $filename = 'page_' . $pageNumber . '_' . uniqid() . '.png';
        $fullPath = $this->outputPath . $filename;
        print_r(storage_path('app/public/' . $fullPath));
        $imagick->writeImage(storage_path('app/public/' . $fullPath));

        // return [
        //     'path' => $fullPath,
        //     'url' => asset('storage/' . $fullPath)
        // ];
        // } catch (Exception $e) {
        //     report($e);
        //     return null;
        // }
    }
}
