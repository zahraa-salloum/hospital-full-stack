<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$department_id = $_GET['department_id'];

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from rooms where department_id = ?');
$query->bind_param('i', $department_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$room_number, $is_vip, $number_beds,$floor_number,$phone_number,$cost_day_usd,$department_id);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no rooms";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'room_number' => $room_number,
            'is_vip' => $is_vip,
            'number_beds' => $number_beds,
            'floor_number' => $floor_number,
            'phone_number' => $phone_number,
            'cost_day_usd' => $cost_day_usd,
            'department_id' => $department_id
            );
            array_push($response, $data);
}
}

echo json_encode($response);