<?php

use App\Helpers\AmountHelper;
use App\Helpers\RandomHelper;

$data = file_get_contents(storage_path('app/public/app_media/CSLAB Logo.png'));
$file_type = "png";
$base64 = 'data:image/' . $file_type . ';base64,' . base64_encode($data);



$student_id = $student_fee_details['student_id'];
$transaction_id = $student_fee_details['transaction_id'];
$fee_amount = $student_fee_details['fee_amount'];
$payment_date = $student_fee_details['payment_date'];
$payment_date_parts = explode('-', $payment_date);
$payment_date_year = $payment_date_parts[0];
$payment_date_month = $payment_date_parts[1];
$payment_date_day = $payment_date_parts[2];
$randomString = RandomHelper::generateRandomString(5);
$randomAlpthabetString = RandomHelper::generateRandomAlphabetsString(5);
$verification_code = $randomString . $randomAlpthabetString . $student_id . 'C' . $transaction_id . 'S' . $fee_amount . 'L' . $payment_date_year . 'A' . $payment_date_month . 'B' . explode(' ', $payment_date_day)[0];
$linkToVerify = route('api.verify.student.fees.receipt', ['verification_code' => $verification_code]);


$qrCodeImageData =  file_get_contents(route('generate.qr.code', ['msg' => $linkToVerify]));
$qr_code_file_type = "png";
$qr_code_base64 = 'data:image/' . $file_type . ';base64,' . base64_encode($qrCodeImageData);


$address = "City light Colony, Piprali Road Sikar";
$contact_number = "6378535557";
$services = "Internship | Software/ Web Development | Training ";
$website = "www.cslab.in";
$about_institute = "CSLAB stands at the forefront of computer science education in Sikar, delivering world-class technical training that transforms ambitious students into industry-ready professionals. We believe in making premium technology education accessible and affordable, breaking down barriers to entry in the rapidly evolving IT sector. CSLAB distinguishes itself through its unique project-centric learning methodology, where students work on carefully crafted, industry-relevant projects that simulate real-world challenges. This approach ensures that our graduates possess not just theoretical knowledge, but practical expertise that multinational organizations seek."



?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @page {
            margin: 20px;
        }

        body {
            margin: 20px;
            /* font-family: DejaVu Sans; */

        }

        .watermark-area {
            background:url("{{$base64}}");
            background-size: 15.7%;
            opacity: 0.03;
            position: absolute;
            /* z-index: -1; */
            height: 10.8in;
            width: 8.27in;
            top: 0px;
            left: 0px;
            padding: 20px;
            box-sizing: border-box;
        }

        .pdf-document {
            z-index: 1;
        }

        .pdf-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
        }

        .detail {
            font-size: 15px;
        }

        p {
            margin: 0px;
        }
    </style>
</head>


<body>
    <div class="watermark-area"></div>
    <div class="pdf-document">
        <div class="pdf-header">
            <h2 style="float:left; margin:0px; font-size:30px;">Receipt</h2>
            <img src="{{storage_path('app/public/app_media/CSLAB Logo.png')}}" style="float:right;width:160px" alt="">
        </div>
        <div class="studentInfo" style="margin-top:20px;">
            <div class="detail">
                <b>Name : </b>
                {{ $user_details['name'] }}
            </div>
            <div class="detail">
                <b>Father's Name : </b>
                {{ $student_details['fname'] }}
            </div>
            <div class="detail">
                <b>Date of Joining : </b>
                {{ date_format(date_create($student_details['doj']),"d-m-Y")}}
            </div>
            <div class="detail">
                <b>Course Title : </b>
                Full Stack Web development
            </div>
            <div class="detail">
                <b>Payment Date : </b>

                {{ date_format(date_create($student_fee_details['payment_date']),"d-m-Y") }}
            </div>
            <div class="detail">
                <b>Amount : </b>
                Rs. {{ $student_fee_details['fee_amount'] }}/-
            </div>
            <div class="detail">
                <b>Amount in words: </b>
                {{ucwords(AmountHelper::getAmountToWord((float)$student_fee_details['fee_amount']))}} Rupess only
            </div>
            <div class="detail">
                <b>Payment Mode: </b>
                {{ $student_fee_details['fee_mode'] }}
            </div>
            <div class="detail">
                <b>Total Fee Received: </b>
                Rs. {{ $student_details['amount_paid'] }}/-
            </div>
        </div>

        <div class="qr-code" style="text-align:center; font-size:10px; margin-top:20px;">
            <a href="{{$linkToVerify}}" target="_BLANK"><img src="{{$qr_code_base64}}" style="width:200px;height:200px; margin-top:20px;" alt=""></a>
            <div style="margin-top:10px;">(Scan QR code for more detail)</div>
            <p style="margin-top:12px;">Address : {{ $address }}</p>
            <p>Contact Number : {{ $contact_number }}</p>
            <p><b><a style="text-decoration:none; color:black;" href="https://{{ $website }}">{{ $website }}</a></b></p>
            <div style="font-size:16px; margin-top:20px">
                <p><b>{{ $services }}</b></p>
                <p style="text-align:justify; font-size:10px; margin-top:10px;">{{ $about_institute }}</p>
            </div>
        </div>
    </div>
</body>

</html>