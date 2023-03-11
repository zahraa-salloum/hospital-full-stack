<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$department_id = $_GET['department_id'];
$hospital_id = $_GET['hospital_id'];
$user_id = $_GET['user_id'];

$response['status'] = "Something went wrong";

if($user_id != null){
    $query = $mysqli->prepare('insert into user_departments (user_id, department_id, hospital_id) values (?, ?, ?)');
    $query->bind_param('iii', $user_id, $department_id, $hospital_id);
    $query->execute();
    $response['status'] = "success";
}

echo json_encode($response);
