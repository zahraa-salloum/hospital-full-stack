<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from services where status is null');
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$description, $cost, $patient_id,$employee_id,$department_id,$status);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no services are null";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'description' => $description,
            'cost' => $cost,
            'patient_id' => $patient_id,
            'employee_id' => $employee_id,
            'department_id' => $department_id,
            'status' => $status
            );
            array_push($response, $data);
}
}

echo json_encode($response);