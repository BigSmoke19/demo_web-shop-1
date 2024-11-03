<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: *'); 

require 'sendemail/sendEmail.php';

// Database connection
require_once('connect.php');


// Get the JSON data from the POST request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$stmt2 = $conn->prepare("SELECT token FROM tokens WHERE tokenname = 'orderToken'");
$stmt2->execute();
$result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
$token = $result2["token"];

if(!isset($data['token']) || $data['token'] != $token){
    die('access denied!!!');
}

// Check if data is valid
if (isset($data['useremail'])) {
    // Sanitize input data

    $email = filter_var($data['useremail'], FILTER_SANITIZE_EMAIL);
    $orderdata = json_encode($data['data']);
    $total = intval(json_encode($data['total']));
    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        echo "Invalid email format";
        exit;
    }

    try {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO orders (cusemail,orderdata,total) VALUES (:cusemail,:orderdata,:total)");
        $stmt->bindParam(':cusemail', $email, PDO::PARAM_STR);
        $stmt->bindParam(':orderdata',$orderdata , PDO::PARAM_STR);
        $stmt->bindParam(':total',$total , PDO::PARAM_INT);

        // Execute the statement
        $stmt->execute();

        $subject = "Test Email";
        $message = "Yor Order is Marked!";

        sendEmail($email, $subject, $message,1);

        echo "New record created successfully";
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "An error occurred. Please try again later.";
    }
} else {
    echo "Invalid JSON data";
}

$conn = null;

