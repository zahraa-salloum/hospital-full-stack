<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$medication_id = $_POST['medication_id'];
$user_id = $_POST['user_id'];
$quantity = $_POST['quantity'];

$response['status'] = "Something went wrong";

if($user_id != null){
    $query = $mysqli->prepare('insert into users_has_medications (user_id, medication_id, quantity) values (?, ?, ?)');
    $query->bind_param('iis', $user_id, $medication_id, $quantity);
    $query->execute();
    $response['status'] = "success";
}

echo json_encode($response);