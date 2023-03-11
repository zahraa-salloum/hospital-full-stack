<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$hospital_id = $_GET['hospital_id'];


$prepare_query = $mysqli->prepare('select * from patients_info where hospital_id = ?');
$prepare_query->bind_param('i', $hospital_id);
$prepare_query->execute();
$prepare_query->store_result();
$patient_number = $prepare_query -> num_rows();

$response['Patients'] = $patient_number;

echo json_encode($response);


