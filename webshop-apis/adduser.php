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

$stmt2 = $conn->prepare("SELECT token FROM tokens WHERE tokenname = 'signUpToken'");
$stmt2->execute();
$result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
$token = $result2["token"];

if(!isset($data['token']) || $data['token'] != $token){
    die('access denied!!!');
}

// Check if data is valid
if (isset($data['name']) && isset($data['email']) && isset($data['password'])) {
    // Sanitize input data
    $name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        echo "Invalid email format";
        exit;
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $hashed_password, PDO::PARAM_STR);

        // Execute the statement
        $stmt->execute();

        echo "new record added!!";

    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "An error occurred. Please try again later.";
    }
} else {
    echo "Invalid JSON data";
}

$conn = null;

