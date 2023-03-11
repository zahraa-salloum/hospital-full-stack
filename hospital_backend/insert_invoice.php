<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');


$user_id = $_GET['user_id'];
$hospital_id = $_GET['hospital_id'];
$total_amount = $_GET['total_amount'];
$date_issued = $_GET['date_issued'];

$response['status'] = "Something went wrong";

if($user_id != null){
    $query = $mysqli->prepare('insert into invoices (user_id,hospital_id,total_amount,date_issued) values (?, ?, ?,?)');
    $query->bind_param('iiss', $user_id, $hospital_id, $total_amount,$date_issued);
    $query->execute();
    $response['status'] = "success";
}
echo json_encode($response);