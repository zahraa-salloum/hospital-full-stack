<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$bed_id = $_POST['bed_id'];
$taken = $_POST['taken'];

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select taken from beds where id = ?');
$query->bind_param('i', $bed_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($taken_status);
$response = [];


if($taken_status == 0 && $taken == 0){
    $query = $mysqli->prepare('update beds set taken = ? where id = ?');
    $query->bind_param('si', $taken,$bed_id);
    $query->execute();
    $response['status'] = "Bed emptied successfully";
} 
 
   if($taken_status == 0 && $taken == 1){
    $query = $mysqli->prepare('update beds set taken = ? where id = ?');
    $query->bind_param('si', $taken,$bed_id);
    $query->execute();
    $response['status'] = "Bed taken successfully";
}

echo json_encode($response);