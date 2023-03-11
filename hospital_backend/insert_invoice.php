<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');


$user_id = $_POST['user_id'];
$hospital_id = $_POST['hospital_id'];
$total_amount = $_POST['total_amount'];
$date_issued = $_POST['date_issued'];

$response['status'] = "Something went wrong";

if($user_id != null){
    $query = $mysqli->prepare('insert into invoices (user_id,hospital_id,total_amount,date_issued) values (?, ?, ?,?)');
    $query->bind_param('iiss', $user_id, $hospital_id, $total_amount,$date_issued);
    $query->execute();
    $response['status'] = "success";
}
echo json_encode($response);