<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');



$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from patients_info where hospital_id is null');
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$user_id, $blood_type, $EHR,$gender,$hosital_id);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no users with no assigned hospitals";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'user_id' => $user_id,
            'blood_type' => $blood_type,
            'EHR' => $EHR,
            'gender' => $gender,
            'hosital_id' => $hosital_id
            );
            array_push($response, $data);
}
}

echo json_encode($response);