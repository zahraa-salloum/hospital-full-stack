<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$description = $_POST['description'];
$cost = $_POST['cost'];
$patient_id = $_POST['patient_id'];
$employee_id = $_POST['employee_id'];
$department_id = $_POST['department_id'];


$response['status'] = "Something went wrong";

if($employee_id != null){
    $query = $mysqli->prepare('insert into services (description, cost, patient_id,employee_id,department_id) values (?, ?, ?,?,?)');
    $query->bind_param('ssiii', $description, $cost, $patient_id,$employee_id,$department_id);
    $query->execute();
    $response['status'] = "success";
}
echo json_encode($response);