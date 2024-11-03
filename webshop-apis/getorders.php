<?php 

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: *'); 

// Database connection
require_once('connect.php');


    try {
        // Prepare and bind
        $stmt = $conn->prepare("SELECT orderid,cusemail,orderdata,total FROM orders");
        // Execute the statement
        $stmt->execute();

        // Fetch all results
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($result)) {
            echo $jsonResult = json_encode($result);
        }
        else {
            echo json_encode(array("message" => "No orders found"));
        }

    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo "An error occurred. Please try again later.";
    }

$conn = null;
