<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$user_id = $_GET['user_id'];
$hospital_id = $_GET['hospital_id'];

$response['status'] = "Something went wrong";

// user_id checkup

$check_user_id = $mysqli->prepare('select user_id from patients_info where user_id =?');
$check_user_id->bind_param('i', $user_id);
$check_user_id->execute();
$check_user_id->store_result();
$user_id_exists = $check_user_id -> num_rows();

if ($user_id_exists > 0) {
    $query = $mysqli->prepare('update patients_info set hospital_id = ? where user_id = ?');
    $query->bind_param('ii', $hospital_id,$user_id);
    $query->execute();
    $response['status'] = "Hospital set";
}

echo json_encode($response);