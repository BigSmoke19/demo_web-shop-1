<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

function sendEmail($email, $subject, $message,$htmlnbr) {
    $mail = new PHPMailer(true);
    $code = random_int(10000000, 99999999);
    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'customerservicewebsop@gmail.com';
        $mail->Password   = 'hxsngdxnwuslmyje';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;;
        $mail->Port       = 465;//587
        $mail->SMTPSecure = 'ssl';//tls
        //$mail->SMTPDebug = 1;
        //Recipients
        $mail->setFrom('customerservicewebsop@gmail.com', 'web-shop');
        $mail->addAddress($email);

        //Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        
        // HTML email template
        $htmlContent1 = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: #007bff;
                    color: #ffffff;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    margin: 0;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #333333;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #f4f4f4;
                    color: #777777;
                    border-radius: 0 0 10px 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Order Summary</h1>
                </div>
                <div class="content">
                    <p>Dear Customer</p>
                    <p>' . $message . '</p>
                </div>
                <div class="footer">
                    <p>&copy; ' . date('Y') . ' webshop. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>';

        $htmlContent2 = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: #007bff;
                    color: #ffffff;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    margin: 0;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #333333;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #f4f4f4;
                    color: #777777;
                    border-radius: 0 0 10px 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verfication</h1>
                </div>
                <div class="content">
                    <p>Dear Customer</p>
                    <p>' . $message . '</p>
                    <p>' . $code . '</p>
                </div>
                <div class="footer">
                    <p>&copy; ' . date('Y') . ' webshop. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>';

        ($htmlnbr == 1)?$mail->Body = $htmlContent1: $mail->Body = $htmlContent2;


        //Send email
        $mail->send();
        
    } catch (Exception $e) {
        echo "Message could not be sent check your connection. Mailer Error: {$mail->ErrorInfo}";
    }
    return $code;
}

