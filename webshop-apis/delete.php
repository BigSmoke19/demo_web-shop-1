<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: *'); 


// Database connection
require_once('connect.php');

// Get the JSON data from the POST request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$stmt2 = $conn->prepare("SELECT token FROM tokens WHERE tokenname = 'createToken'");
$stmt2->execute();
$result = $stmt2->fetch(PDO::FETCH_ASSOC);
$token = $result["token"];

if(!isset($data['token']) || $data['token'] != $token){
    die('access denied!!!');
}

// Check if data is valid
if (isset($data['id'])) {
    // Sanitize input data
    $id = $data['id'];

    try {
        // Prepare and bind
        
        $stmt = $conn->prepare("DELETE FROM products where id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        // Execute the statement
        $stmt->execute();

        echo "New record created successfully";
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "An error occurred. Please try again later." . $e->getMessage();
    }
} else {
    echo "Invalid JSON data";
}

$conn = null;
