<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0px;
            font-family: arial;

        }

        .email-area {
            max-width: 500px;
            width: 100%;
            margin: auto;
        }

        table {

            border-collapse: collapse;
            width: 100%;

        }

        table tr {
            width: 100%;
        }

        table td {
            /* border: 5px solid red; */
            text-align: center;

        }

        .code {
            font-size: 60px;
            font-weight: bold;
        }

        .email-header {
            background: #eef;
            color: #555;
            padding: 20px;
            border-radius: 10px;
            margin-top: 60px;
        }

        .email-content {
            text-align: center;
        }

        .email_footer {
            background: #125;
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            margin-top: 60px;
        }


        table.email_footer tr td {
            padding: 5px;
        }

        a {
            text-decoration: none;
            color: #fff;
        }

        a:hover {
            text-decoration: underline;
        }

        .links-list {
            list-style: none;

        }

        .links-list li a {
            display: flex;
            align-items: start;
            gap: 5px;

        }

        .icon {
            width: 16px;
        }
    </style>
</head>

<body>
    <div class="email-area">
        <div class="email-header" style="margin:0px;">
            <table>
                <tr>
                    <td>
                        <!-- <img style=" width:200px;" src=" {{URL::to('/')}}/storage/app_media/CSLAB Logo white-bg.jpg" alt=""> -->

                        <img style="width:200px;" src="https://mliekvpsfk1b.i.optimole.com/w:1920/h:640/q:mauto/ig:avif/https://cslab.in/wp-content/uploads/2024/01/CSLAB-Logo-2023.svg" alt="">

                    </td>
                </tr>
                <tr>
                    <td style="font-size:14px; color:#333">

                        Software Development & Training in Sikar
                    </td>
                </tr>

            </table>
        </div>
        <div class="email-content">
            <div style="padding:60px 20px 20px 20px;">To update the email, your email verification code is</div>
            <div class="code">1234</div>

        </div>
        <div class="email_footer" style="border-radius:10px 10px 0px 0px ;>
            <h3 class=" heading">About CSLAB</h3>
            <p>Welcome to our institute in Sikar, Rajasthan! We are a leading programming institute offering comprehensive training in Full Stack Web Development and various programming languages including C, C++, Python, and more. With our expert faculty and state-of-the-art facilities, we provide a conducive learning environment for students to enhance their coding skills and excel in the field of technology. </p>

            <table>
                <tbody>
                    <tr>
                        <td valign="middle" class="bg_black footer email-section">
                            <table>
                                <tbody>
                                    <tr>

                                        <td valign="top" width="50%" style="padding-top: 20px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                                            <h3 class="heading">Contact Info</h3>
                                                            <div>
                                                                City ligth colony, Piprali road, Sikar
                                                            </div>
                                                            <div class="display:flex;align-items:center;">

                                                                <svg style="margin-top:20px;" width="14" height="14" viewBox="0 0 16.004 16.004" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                                    <g id="SVGRepo_iconCarrier">
                                                                        <g color="#f5f5f5" fill="#f5f5f5">
                                                                            <path d="M8 4.846v10.38l-2.344-2.288-1.34 2.734c-.327.74-2.033.145-1.548-.844l1.326-2.839H1.136z" style="marker:none" display="block" overflow="visible"></path>
                                                                            <path d="M7.156 1.063C3.33 1.522.578 5.02 1.063 8.843c.131 1.035.293 1.383.293 1.383l1.675-1.632A4.992 4.992 0 017.406 3.03a4.992 4.992 0 015.563 4.375c.314 2.608-1.391 5.025-3.969 5.532l.031 2s.521-.106.624-.131c3.416-.834 5.706-4.128 5.283-7.65-.46-3.827-3.955-6.555-7.782-6.095z" style="line-height:normal;-inkscape-font-specification:Sans;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;marker:none" font-weight="400" font-family="Sans" overflow="visible"></path>
                                                                            <path d="M4.113 7.815v-.206l-.198.019.05-.393h-.117l-.115.15-.116.056-.165-.093-.017-.206.033-.225.248-.186h.199l.033-.113.247.056.182.225.033-.374.314-.262.116-.28.231-.094.133-.187.297-.056.149-.225h-.446l.28-.13h.199l.28-.094.034-.112-.1-.094-.115-.037.033-.112-.083-.169-.198.075.033-.15-.231-.13-.182.317.017.113-.182.075-.116.243-.05-.225-.313-.13-.05-.169.413-.243.182-.168.017-.206-.1-.056L4.84 4l-.082.206s-.139.027-.174.036C4.13 4.66 3.214 5.562 3 7.266c.008.04.155.268.155.268l.347.206.347.093m3.966-4.3l-.43-.168-.496.056-.611.168-.116.112.38.262v.15l-.149.15.199.392.132-.075.165-.262a5.51 5.51 0 00.727-.28l.199-.505m2.529.342l-.375.094-.219.156v.125l-.375.25.094.344.219-.157.125.157.156.093.094-.28L10 4.5l.063-.094.218-.187h.094l-.094.218v.188c.09-.024.16-.051.25-.063l-.25.188v.125l-.312.219-.281-.063v-.156l-.125.062.062.157h-.219l-.125.218-.156.157-.094.03v.188l.032.157H9.03v.53l.063-.03.094-.219L9.375 6l.031-.094.282-.062.156.187.187.094-.093.187.156-.03.062-.22-.187-.218h.062l.22.156.03.219.157.219.062-.313.094-.031c.096.1.169.231.25.344h.281l.188.125-.094.093-.156.157h-.25l-.344-.094h-.188l-.125.156-.343-.375-.25-.062-.375.062-.157.094V9l.032.031.25-.156.093.094h.281l.125.156-.093.312.187.188V10l.125.25-.093.25c-.01.161 0 .307 0 .469.08.219.143.435.218.656l.063.344v.187h.125l.219-.125h.25l.375-.437-.032-.157.25-.218-.187-.188.219-.187.218-.125.094-.125-.062-.25V9.75l.187-.375.188-.25.25-.563v-.156c-.117.015-.23.023-.344.031-.072.005-.145 0-.219 0a7.442 7.442 0 01-.312-.78l-.157-.188-.093-.313.062-.062.219.25.25.562.156.156-.062.22.156.155.25-.25.312-.218.157-.188v-.219c-.04-.073-.055-.145-.094-.218l-.156.187-.125-.156-.188-.125v-.281l.219.218.219-.03c.101.091.192.207.28.312L13 7.28c0-.174-.2-1.02-.625-1.75S11.22 4.125 11.22 4.125l-.063.094-.218.218-.25-.25h.25l.125-.125-.47-.093-.25-.094z" style="marker:none" overflow="visible" opacity=".3"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <a href="https://www.cslab.in">www.cslab.in</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td valign="top" style="padding-top: 20px;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: left; padding-left: 10px;">
                                                            <h3 class="heading">Useful Links</h3>
                                                            <ul class="links-list">
                                                                <li><a href="#">
                                                                        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                                            <g id="SVGRepo_iconCarrier">
                                                                                <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                            </g>
                                                                        </svg>
                                                                        Home</a></li>
                                                                <li><a href="#">
                                                                        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                                            <g id="SVGRepo_iconCarrier">
                                                                                <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                            </g>
                                                                        </svg>
                                                                        About</a></li>

                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr><!-- end: tr -->
                    <tr>

                    </tr>
                </tbody>
            </table>
        </div>

        <div style="background:#113;  padding:2px 10px; color:#fff;">
            <table>
                <tbody>
                    <tr>
                        <td valign=" top" width="60%">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td style="text-align: left; padding-right: 10px;">
                                            <p>© {{ date('Y') }} CSLAB. All Rights Reserved</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td valign="top" width="33.333%">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td style="text-align: right; padding-left: 5px; padding-right: 5px;">
                                            <p><a href="#" style="color: rgba(255,255,255,.4);">Unsubcribe</a></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</body>

</html>