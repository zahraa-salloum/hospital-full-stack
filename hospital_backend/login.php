<?php
use Firebase\JWT\JWT;
header("Access-Control-Allow-Origin: *");
include('connection.php');

require_once 'vendor/autoload.php'; 

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,name,email,password,dob,usertype_id from users where email=?');
$query->bind_param('s', $email);
$query->execute();

$query->store_result();
$num_rows = $query->num_rows();
$query->bind_result($id,$name, $email,$hashed_password,$dob,$usertype_id);
$query->fetch();
$response = [];
if ($num_rows == 0) {
    $response['response'] = "user not found";
    
} else {
    if (password_verify($password, $hashed_password)) {
        $response['response'] = "logged in";
        $response['id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        $response['dob'] = $dob;
        $response['usertype_id'] = $usertype_id;
       

    } else {
        $response["response"] = "Incorrect password";
        
    }
}


if ($response['response'] == "logged in") {


    $secret_key = 'DKBKS521dnjkd5HJHmdl2568';
    $issuer_claim = "localhost"; 
    $audience_claim = "localhost"; 
    $issuedat_claim = time(); 
    $notbefore_claim = $issuedat_claim + 10;
    $expire_claim = $issuedat_claim + 3600; 
    $token = array(
        "iss" => $issuer_claim,
        "aud" => $audience_claim,
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "data" => array(
            "email" => $email,
        )
    );
    $jwt = JWT::encode($token, $secret_key);

    echo json_encode(
        array(
            "message" => "Successful login",
            "token" => $jwt,
            "name" =>$response['name'],
            "email" =>$response['email'],
            "dob" =>$response['dob'],
            "usertype_id" =>$response['usertype_id'],
            "id" =>$response['id']
        )
    );
} else {

    echo json_encode(
        array(
            "message" => "Wrong email or password"
        )
    );
}
