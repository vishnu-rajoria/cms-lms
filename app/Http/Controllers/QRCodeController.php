<?php

namespace App\Http\Controllers;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;

class QRCodeController extends Controller
{
    function geneateQrCode(Request $request)
    {
        $image = QrCode::format('png')
            ->merge(public_path('storage/app_media/CSLAB Logo white-bg.jpg'), 0.5, true)
            ->size(150)
            ->errorCorrection('H')
            ->generate($request->msg);


        return response($image)->header('Content-type', 'image/png');
        // phpinfo();
    }
}
