<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$id_sent = $_GET['id'];



$query = $mysqli->prepare('select * from users where id = ?');
$query->bind_param('i', $id_sent);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$name, $email, $password,$dob,$usertype_id);
$query->fetch();
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no such user";
} else {
        $response['id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        $response['dob'] = $dob;
        $response['usertype_id'] = $usertype_id;
}


echo json_encode($response);