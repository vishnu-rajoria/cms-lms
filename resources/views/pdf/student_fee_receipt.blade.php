<?php
$data = file_get_contents(storage_path('app/public/app_media/CSLAB Logo.png'));
$file_type = "png";
$base64 = 'data:image/' . $file_type . ';base64,' . base64_encode($data);

$address = "City light Colony, Piprali Road Sikar";
$contact_number = "6378535557";
$services = "Internship | Software/ Web Development | Training | Graphic Design | Video Editing |Technology Rollout";
$website = "www.cslab.in";
$about_institute = "mycslab provides high-quality computer education in SIkar at a very high standard at a very low cost. We believe that training in the latest computer technologies is an essential ingredient for
building a successful career in the IT Industry. mycslab’s mission is to create a pool of highquality software/ Computer professionals who will meet the demanding needs of multinational
organizations for tomorrow’s challenges. mycslab emphasis is given to the maximum extent on
the projects by maximum practical learning through simulated projects designed to the needs of
the industry."



?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @page {
            margin: 20px;
        }

        body {
            margin: 20px;


        }

        .watermark-area {
            background:url("{{$base64}}");
            background-size: 17%;
            opacity: 0.03;
            position: absolute;
            /* z-index: -1; */
            height: 5in;
            width: 4.1in;
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
            height: 70px;
        }

        .detail {
            font-size: 13px;
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
            <h2 style="float:left; margin:0px;">Receipt</h2>
            <img src="{{storage_path('app/public/app_media/CSLAB Logo.png')}}" style="float:right;width:120px" alt="">
        </div>
        <div class="studentInfo">
            <div class="detail">
                <b>Name : </b>
                {{ $user_details['name'] }}
            </div>
            <div class="detail">
                <b>Date of Joining : </b>
                {{ $student_details['doj'] }}
            </div>
            <div class="detail">
                <b>Course Title : </b>
                Full Stack Web development
            </div>
            <div class="detail">
                <b>Fee Submit date : </b>
                {{ $student_fee_details['payment_date'] }}
            </div>
            <div class="detail">
                <b>Amount : </b>
                {{ $student_fee_details['fee_amount'] }}
            </div>
            <div class="detail">
                <b>Amount in words: </b>
                Five thousand rupees only
            </div>
            <div class="detail">
                <b>Payment Mode: </b>
                {{ $student_fee_details['fee_mode'] }}
            </div>
        </div>

        <div class="qr-code" style="text-align:center; margin:30px; font-size:10px;">
            <img src="https://abcd.com" style="width:100px;height:100px" alt="">
            <div>(Scan QR code for more detail)</div>
            <p>Address : {{ $address }}</p>
            <p>Contact Number : {{ $contact_number }}</p>
            <p>Website : {{ $website }}</p>
            <p style="font-size:8px;">Services : {{ $services }}</p>
            <p style="font-size:8px;">About Institute : {{ $about_institute }}</p>
        </div>
    </div>
</body>

</html>