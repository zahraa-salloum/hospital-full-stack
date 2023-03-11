<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$hospital_id = $_POST['hospital_id'];

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from departments where hospital_id = ?');
$query->bind_param('i', $hospital_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$name, $building, $floor,$hospital_id);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no departments";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'name' => $name,
            'building' => $building,
            'floor' => $floor,
            'hospital_id' => $hospital_id
            );
            array_push($response, $data);
}
}

echo json_encode($response);