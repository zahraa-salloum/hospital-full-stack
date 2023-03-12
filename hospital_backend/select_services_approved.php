<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$id = $_GET['id'];

$response['status'] = "Something went wrong";



$query = $mysqli->prepare('select cost from services where patient_id =? and status = \'Approved\'');
$query->bind_param('i', $id);
$query->execute();

$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($cost);



$response = [];
if ($num_rows == 0) {
    $response['response'] = "no services";
} else {
    
        
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'cost' => $cost
            );
            array_push($response, $data);
}
    }



echo json_encode($response);