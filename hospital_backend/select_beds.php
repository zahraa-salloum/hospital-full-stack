<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$department_id = $_GET['department_id'];
$hospital_id = $_GET['hospital_id'];
$room_id = $_GET['room_id'];

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from beds where department_id = ? AND hospital_id = ? AND room_id = ? AND taken = 0');
$query->bind_param('iii', $department_id,$hospital_id,$room_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$room_id, $hospital_id, $department_id,$taken);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no beds";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'room_id' => $room_id,
            'hospital_id' => $hospital_id,
            'department_id' => $department_id,
            'taken' => $taken
            );
            array_push($response, $data);
}
}

echo json_encode($response);