<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$response['status'] = "Something went wrong";

$query = $mysqli->prepare('select * from hospitals');
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$name, $address, $phone_number,$email,$facebook_url);
$response = [];

// echo $query;
if ($num_rows == 0) {
    $response['response'] = "no hospitals";
} else {
    while ($query->fetch() && $num_rows !== 0)  {
        $data = array(
            'id' => $id,
            'name' => $name,
            'address' => $address,
            'phone_number' => $phone_number,
            'email' => $email,
            'facebook_url' => $facebook_url
            );
            array_push($response, $data);
}
}

echo json_encode($response);