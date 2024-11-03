<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: *'); 

require 'sendemail/sendEmail.php';

if (isset($_GET['email'])) {
    // Retrieve the email from the GET request
    $email = $_GET['email'];

    // Validate the email address
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {


    $subject = "Email Verification";
    $message = "Verify Your Email";
    $code = sendEmail($email, $subject, $message,2);
    echo $code;
    }
}