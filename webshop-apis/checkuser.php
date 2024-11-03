<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: *'); 
header('Content-Type: application/json');

// Database connection
require_once'connect.php';

// Get the JSON data from the POST request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check if login data is sent via GET method
if ((isset($data['email']) && isset($data['password']))) {
    // Sanitize input data
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        echo json_encode(["email" => 0, "password" => 0,"isadmin" => 0 ,"message" => "Invalid email format"]);
        exit;
    }

    try {
        // Prepare and bind
        $stmt = $conn->prepare("SELECT password,isadmin FROM users WHERE email = :email");
        $stmt->bindValue(':email', $email, PDO::PARAM_STR);

        // Execute the statement
        $stmt->execute();

        // Fetch the hashed password from the database
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $response = ["email" => 0, "password" => 0,"isadmin" => 0,"token" => "","ordertoken" => ""];

        if ($result) {
            $response["email"] = 1;
            if (password_verify($password, $result['password'])) {
                $response["password"] = 1;
            }
            $response["isadmin"] = $result["isadmin"];
            if($result["isadmin"]){
                $stmt2 = $conn->prepare("SELECT token FROM tokens WHERE tokenname = 'createToken'");
                $stmt2->execute();
                $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                $response["token"] = $result2["token"];
            }
            $stmt3 = $conn->prepare("SELECT token FROM tokens WHERE tokenname = 'orderToken'");
            $stmt3->execute();
            $result3 = $stmt3->fetch(PDO::FETCH_ASSOC);
            $response["ordertoken"] = $result3["token"];
        }

        echo json_encode($response);
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode(["email" => 0, "password" => 0,"isadmin" => 0, "message" => "An error occurred. Please try again later."]);
    }
} else {
    echo json_encode(["email" => 0, "password" => 0,"isadmin" => 0, "message" => "Invalid login data"]);
}

$conn = null;
