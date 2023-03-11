<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$SSN = $_GET['SSN'];
$position  = $_GET['position'];
$gender = $_GET['gender'];
$user_id = $_GET['user_id'];

$response['status'] = "Something went wrong";

// user_id checkup

$check_user_id = $mysqli->prepare('select user_id from employees_info where user_id =?');
$check_user_id->bind_param('i', $user_id);
$check_user_id->execute();
$check_user_id->store_result();
$user_id_exists = $check_user_id -> num_rows();

if ($user_id_exists > 0) {
    $query = $mysqli->prepare('update employees_info set SSN = ?,position= ?,gender= ? where user_id = ?');
    $query->bind_param('sssi', $SSN,$position,$gender,$user_id);
    $query->execute();
    $response['status'] = "Info updated";
} else{
    $query = $mysqli->prepare('insert into employees_info (SSN, position, gender, user_id) values (?, ?, ?, ?)');
    $query->bind_param('sssi', $SSN, $position, $gender, $user_id);
    $query->execute();
    $response['status'] = "Info added";
}
echo json_encode($response);
