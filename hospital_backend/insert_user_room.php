<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$room_id = $_POST['room_id'];
$bed_id = $_POST['bed_id'];
$user_id = $_POST['user_id'];
$datetime_entered = $_POST['datetime_entered'];
$datetime_left = $_POST['datetime_left'];


$response['status'] = "Something went wrong";

if($user_id != null){
    $query = $mysqli->prepare('insert into user_rooms (user_id, room_id, datetime_entered,datetime_left,bed_id) values (?, ?, ?, ?, ?)');
    $query->bind_param('iissi', $user_id, $room_id, $datetime_entered,$datetime_left,$bed_id);
    $query->execute();
    $response['status'] = "success";
}

echo json_encode($response);