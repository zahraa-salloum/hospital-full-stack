<?php

header("Access-Control-Allow-Origin: *");
include('connection.php');

$response = [];

$user_gender_female= 'female';
$check_female_patient = $mysqli->prepare('select * from patients_info where gender = ?');
$check_female_patient->bind_param('s', $user_gender_female);
$check_female_patient->execute();
$check_female_patient->store_result();
$female_patient_number = $check_female_patient -> num_rows();

$response['female_patients'] = $female_patient_number;

// ---------------------------------------------------------------------------------------------

$user_gender_male= 'male';
$check_male_patient = $mysqli->prepare('select * from patients_info where gender = ?');
$check_male_patient->bind_param('s', $user_gender_male);
$check_male_patient->execute();
$check_male_patient->store_result();
$male_patient_number = $check_male_patient -> num_rows();

$response['male_patients'] = $male_patient_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'A Positive';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['A Positive'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'B Positive';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['B Positive'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'O Positive';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['O Positive'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'AB Positive';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['AB Positive'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'A Negative';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['A Negative'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'B Negative';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['B Negative'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'O Negative';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['O Negative'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$blood_type= 'AB Negative';
$check_blood_type = $mysqli->prepare('select * from patients_info where blood_type = ?');
$check_blood_type->bind_param('s', $blood_type);
$check_blood_type->execute();
$check_blood_type->store_result();
$blood_type_number = $check_blood_type -> num_rows();

$response['AB Negative'] = $blood_type_number;

// ---------------------------------------------------------------------------------------------

$user_gender_female= 'female';
$check_female_employee = $mysqli->prepare('select * from employees_info where gender = ?');
$check_female_employee->bind_param('s', $user_gender_female);
$check_female_employee->execute();
$check_female_employee->store_result();
$female_employee_number = $check_female_employee -> num_rows();

$response['female_employees'] = $female_employee_number;

// ---------------------------------------------------------------------------------------------

$user_gender_male= 'male';
$check_male_employee = $mysqli->prepare('select * from employees_info where gender = ?');
$check_male_employee->bind_param('s', $user_gender_male);
$check_male_employee->execute();
$check_male_employee->store_result();
$male_employee_number = $check_male_employee -> num_rows();

$response['male_employees'] = $male_employee_number;

// ---------------------------------------------------------------------------------------------

echo json_encode($response);