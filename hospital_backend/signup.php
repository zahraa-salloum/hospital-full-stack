<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$name = $_POST['name'];
$email  = $_POST['email'];
$password = $_POST['password'];
$dob = $_POST['dob'];
$user_type = $_POST['user_type'];



//email and password verification

if (empty($email)) {
    $response["status"] = " email is required ";
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response["status"] = 'Invalid email format.';
} else {

    if (empty($password)) {
        $response["status"] = " password is required ";
    } else if (strlen($password) < 8) {
        $response["status"] = " password should be >8 ";
    } else if (!preg_match('/[A-Z]/', $password)) {

        $response["status"] = "Password should contain at least one uppercase letter";
    } else if (!preg_match('/[@#$%^&*()+=\-\[\]\';,.\/{}|":<>?~\\\\]/', $password)) {
        $response["status"] = "Password should contain at least one special letter";
    } else {
        $response["status"] = "success";


// email checkup

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email -> num_rows();



$hashed_password = password_hash($password, PASSWORD_BCRYPT);

    if ($email_exists > 0) {
        $response['status'] = "failed";
    } else {

        $stmt = $mysqli->prepare('select id from user_types where name = ?');
        $stmt->bind_param('s', $user_type);
        $stmt->execute();
        $user_type_id = $stmt->get_result()->fetch_assoc()['id'];
        $stmt->close();
        

        $query = $mysqli->prepare('insert into users (name, email, password, dob, usertype_id) values (?, ?, ?, ?, ?)');
        $query->bind_param('ssssi', $name, $email, $hashed_password, $dob, $user_type_id);
        $query->execute();
        $response['status'] = "success";
    }

}
}
echo json_encode($response);

?>