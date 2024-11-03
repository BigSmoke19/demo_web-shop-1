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
$result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
$token = $result2["token"];

if(!isset($data['token']) || $data['token'] != $token){
    die('access denied!!!');
}

// Check if data is valid
if (isset($data['name']) && isset($data['type']) && isset($data['price']) && isset($data['image'])) {
    // Sanitize input data
    $name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
    $type = htmlspecialchars($data['type'], ENT_QUOTES, 'UTF-8');
    $price = filter_var($data['price'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $image = $data['image'];
    $prefix = "data:image/png;base64,";
    $image = str_replace($prefix, '', $image);

    if(isset($data['sale'])){
        $sale = htmlspecialchars($data['sale'], ENT_QUOTES, 'UTF-8');
    }else{
        $sale = "no";
    }

    try {
        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO products (name, type, price, image,sale) VALUES (:name,:type,:price,:image,:sale)");
        $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->bindParam(':price', $price, PDO::PARAM_STR);
        $stmt->bindParam(':image', $image, PDO::PARAM_STR);
        $stmt->bindParam(':sale', $sale, PDO::PARAM_STR);

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

