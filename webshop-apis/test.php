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

// Check if data is valid
if (isset($data['name'])) {
    // Sanitize input data
    $name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');

    try {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO utest (name) VALUES (:name)");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);

        // Execute the statement
        $stmt->execute();

        echo "New record created successfully";
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "An error occurred. Please try again later.";
    }
} else {
    echo "Invalid JSON data";
}

$conn = null;