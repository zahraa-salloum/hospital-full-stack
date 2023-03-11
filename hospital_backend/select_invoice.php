<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$id = $_GET['id'];

$response['status'] = "Something went wrong";



$query = $mysqli->prepare('select * from invoices where id =?');
$query->bind_param('s', $id);
$query->execute();

$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id, $user_id, $hospital_id, $total_amount,$date_issued);
$query->fetch();


$response = [];
if ($num_rows == 0) {
    $response['response'] = "invoice not found";
} else {
    
        
        $response['id'] = $id;
        $response['user_id'] = $user_id;
        $response['hospital_id'] = $hospital_id;
        $response['total_amount'] = $total_amount;
        $response['date_issued'] = $date_issued;

    }



echo json_encode($response);