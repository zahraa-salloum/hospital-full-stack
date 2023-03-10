<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$employee_id = $_POST['employee_id'];
$hospital_id = $_POST['hospital_id'];
$date_joined = $_POST['date_joined'];

$response['status'] = "Something went wrong";

// employee_id with hospital checkup

$check_employee_combination = $mysqli->prepare('select * from hospitals_employees_info where hospital_id = ? AND employee_id = ?');
$check_employee_combination->bind_param('ii', $hospital_id,$employee_id);
$check_employee_combination->execute();
$check_employee_combination->store_result();
$employee_combination_exists = $check_employee_combination -> num_rows();

if ($employee_combination_exists == 0) {
    $query = $mysqli->prepare('insert into hospitals_employees_info(hospital_id,employee_id, date_joined) values (?, ?, ?)');
    $query->bind_param('iis', $hospital_id,$employee_id,$date_joined);
    $query->execute();
    $response['status'] = "Hospital-Employee set";
}

if ($employee_combination_exists == 1) {
    $response['status'] = "Hospital-Employee already exist";
}

echo json_encode($response);