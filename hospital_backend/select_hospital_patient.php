<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$id_sent = $_GET['id'];



$query = $mysqli->prepare('select hospital_id from patients_info where user_id = ?');
$query->bind_param('i', $id_sent);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($hospital_id);
$query->fetch();
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no hospital id";
} else {
        $response['hospital_id'] = $hospital_id;
}


echo json_encode($response);