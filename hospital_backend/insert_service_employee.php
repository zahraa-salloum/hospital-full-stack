<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$description = $_GET['description'];
$cost = $_GET['cost'];
$patient_id = $_GET['patient_id'];
$employee_id = $_GET['employee_id'];
$department_id = $_GET['department_id'];
$status = $_GET['status'];


$response['status'] = "Something went wrong";

if($employee_id != null){
    $query = $mysqli->prepare('insert into services (description, cost, patient_id,employee_id,department_id,status) values (?, ?, ?,?,?,?)');
    $query->bind_param('ssiii', $description, $cost, $patient_id,$employee_id,$department_id,$status);
    $query->execute();
    $response['status'] = "success";
}
echo json_encode($response);