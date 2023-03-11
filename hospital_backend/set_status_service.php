<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$id = $_GET['id'];
$status = $_GET['status'];

$response['status'] = "Something went wrong";

if($id != null){
    $query = $mysqli->prepare('update services set status = ? where id = ?');
    $query->bind_param('si', $status,$id);
    $query->execute();
    $response['status'] = "Status set";
}

echo json_encode($response);