<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from medications');
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$name, $cost);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no medicines";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'name' => $name,
            'cost' => $cost
            );
            array_push($response, $data);
}
}

echo json_encode($response);