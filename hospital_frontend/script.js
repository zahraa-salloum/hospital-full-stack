const workshop_pages = {};

workshop_pages.base_url = "http://localhost/hospital-full-stack/hospital_backend/";

workshop_pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        console.log("Error from GET API");
    }
}

workshop_pages.postAPI = async (api_url, api_data) => {
    try{
        return await axios.post(
            api_url,
            api_data
        );
    }catch(error){
        console.log("Error from POST API");
    }
}

workshop_pages.loadFor = (page) => {
    eval("workshop_pages.load_" + page + "();");
}

workshop_pages.load_signup = async () => {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let dob = document.getElementById('dob');
    let position = document.getElementById('position');
    let submit = document.getElementById('submit');
    
    function validateEmail() 
{
    email_value = email.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_value))
    {
        document.getElementById("emailmessage").innerText = "";
        return (true)
        
    }
    document.getElementById("emailmessage").innerText = "You have entered an invalid email address!";
    
    return (false)
}

function validateName(){
    name_value = name.value;
    if(name_value.length == 0){
        document.getElementById("namemessage").innerText = "Required field";
        return false;
    }
    document.getElementById("namemessage").innerText = "";
        return true;

}
function validateDob(){
    dob_value = dob.value;
    if(!dob_value){
        document.getElementById("dobmessage").innerText = "Required field";
        return false;
    }
    document.getElementById("dobmessage").innerText = "";
        return true;

}


function validatePassword() {
    password_value = password.value;
        errors = [];
    if (password_value.length < 8) {
        errors.push("Your password must be at least 8 characters..."); 
    }
    if (password_value.search(/[A-Z]/) < 0) {
        errors.push("Your password must contain at least one capital letter...");
    }
    if (password_value.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one digit..."); 
    }
    if(password_value.search(/[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]/) < 0){
        errors.push("Your password must contain at least one special character..."); 
    }
    if (errors.length > 0) {
        let errors_string = errors.join("\n");
        document.getElementById("passwordmessage").innerHTML = errors_string;
        return false;
    }
    document.getElementById("passwordmessage").innerHTML = "";
    return true;
}

submit.addEventListener("click", async function(){
    validateName()
    validateDob()
    validateEmail();
    validatePassword();
    

    const post_users_signup = workshop_pages.base_url + "signup.php";
    
    let data = new FormData();
    data.append('name', name.value);
    data.append('email', email.value);
    data.append('password', password.value);
    data.append('dob', dob.value);
    data.append('user_type', position.value);

    const response = await workshop_pages.postAPI(post_users_signup,data);
    
    if(response.data['status'] == 'success'){
        document.getElementById("successmessage").innerHTML = "Sign up success. Please log in";
    }
  

    
})

    
}

workshop_pages.load_login = async () => {
    let submit = document.getElementById('submit')
    submit.addEventListener('click', logIn);

    async function logIn() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let data = new FormData();
        data.append('email', email);
        data.append('password', password);

        const post_user_login = workshop_pages.base_url + "login.php";
        const response = await workshop_pages.postAPI(post_user_login,data);
        if(response.data['message']=="Successful login"){
            window.localStorage.setItem('user_id', response.data['id']);
            window.localStorage.setItem('usertype_id', response.data['usertype_id']);

        if(window.localStorage.getItem('usertype_id') == 1){
            location.replace("adminpage.html")
        }
        if(window.localStorage.getItem('usertype_id') == 2){
            location.replace("employeepage.html")
        }
        if(window.localStorage.getItem('usertype_id') == 3){
            location.replace("patientpage.html")
        }

        }
    }
}

workshop_pages.load_statistics = async () => {
    const container = document.getElementById('container');
    const get_statistics = workshop_pages.base_url + "statistics_fixed.php";
    const response = await workshop_pages.getAPI(get_statistics);
    

    document.getElementById('bldgrpAP').innerText = response.data['A Positive'];
    document.getElementById('bldgrpBP').innerText = response.data['B Positive'];
    document.getElementById('bldgrpOP').innerText = response.data['O Positive'];
    document.getElementById('bldgrpABP').innerText = response.data['AB Positive'];
    document.getElementById('bldgrpAN').innerText = response.data['A Negative'];
    document.getElementById('bldgrpBN').innerText = response.data['B Negative'];
    document.getElementById('bldgrpON').innerText = response.data['O Negative'];
    document.getElementById('bldgrpABN').innerText = response.data['AB Negative'];
    document.getElementById('patientsMale').innerText = response.data['male_patients'];
    document.getElementById('patientsFemale').innerText = response.data['female_patients'];
    document.getElementById('employeesMale').innerText = response.data['male_employees'];
    document.getElementById('employeesFemale').innerText = response.data['female_employees'];

}

workshop_pages.load_assignpatients = async () => {
    const container = document.getElementById('container');
    const hospital = document.getElementById('hospital');
    const patient = document.getElementById('patient');
    const submit = document.getElementById('submit');
// ----------------------------------Adding hospitals--------------------------------------------------------
    const get_hospitals = workshop_pages.base_url + "select_hospitals.php";
    const response_hospitals = await workshop_pages.getAPI(get_hospitals);
    let hospitals_array = [];
    
    for( let i = 0; i < response_hospitals.data.length; i++){
        let one_hospital = {
            "hospital_id": response_hospitals.data[i]['id'],
            "hospital_name": response_hospitals.data[i]['name']
          };
        hospitals_array.push(one_hospital);
        let newOption = new Option(response_hospitals.data[i]['name'],response_hospitals.data[i]['id']);
        hospital.add(newOption,undefined);
    }
// ----------------------------------Adding patients--------------------------------------------------------
    const get_patients_hospital_null = workshop_pages.base_url + "select_patients_null_hospitals.php";
    const response_patients_hospital_null = await workshop_pages.getAPI(get_patients_hospital_null);
    let patients_array = [];
    
    for( let i = 0; i < response_patients_hospital_null.data.length; i++){
        const get_patient = workshop_pages.base_url + "select_patient.php";
        const response_patient = await workshop_pages.getAPI(get_patient+'?id='+response_patients_hospital_null.data[i]['user_id']);
        
        let one_patient = {
            "patient_info_id": response_patients_hospital_null.data[i]['id'],
            "user_id": response_patients_hospital_null.data[i]['user_id'],
            "user_name": response_patient.data['name']
          };
        patients_array.push(one_patient);
        let newOption = new Option(response_patient.data['name'],response_patients_hospital_null.data[i]['id']);
        patient.add(newOption,undefined);
        
    }
// ---------------------------------------Confirm---------------------------------------------------
submit.addEventListener("click", async function(){
    let hospital_id = hospital.value;
    let patient_id = patient.value;
    
    const set_patient_hospital = workshop_pages.base_url + "set_hospital_patient.php";
    const response_patient_hospital = await workshop_pages.getAPI(set_patient_hospital+'?user_id='+patient_id+'&hospital_id='+hospital_id);
    if(response_patient_hospital.data['status']=="Hospital set"){
    location.reload();
}
})

}

workshop_pages.load_assignemployees = async () => {
    const container = document.getElementById('container');
    const hospital = document.getElementById('hospital');
    const employee = document.getElementById('employee');
    const submit = document.getElementById('submit');
    const dob = document.getElementById('dob');
// ----------------------------------Adding Hospitals--------------------------------------------------------
    const get_hospitals = workshop_pages.base_url + "select_hospitals.php";
    const response_hospitals = await workshop_pages.getAPI(get_hospitals);
    let hospitals_array = [];
    
    for( let i = 0; i < response_hospitals.data.length; i++){
        let one_hospital = {
            "hospital_id": response_hospitals.data[i]['id'],
            "hospital_name": response_hospitals.data[i]['name']
          };
        hospitals_array.push(one_hospital);
        let newOption = new Option(response_hospitals.data[i]['name'],response_hospitals.data[i]['id']);
        hospital.add(newOption,undefined);
    }
// ----------------------------------Adding Employees--------------------------------------------------------
    const get_employees = workshop_pages.base_url + "select_employees.php";
    const response_employees = await workshop_pages.getAPI(get_employees);
    let employees_array = [];
    
    for( let i = 0; i < response_employees.data.length; i++){
        let one_employee = {
            "employee_id": response_employees.data[i]['id'],
            "employee_name": response_employees.data[i]['name']
          };
        employees_array.push(one_employee);
        let newOption = new Option(response_employees.data[i]['name'],response_employees.data[i]['id']);
        employee.add(newOption,undefined);
    }
// --------------------------------Confirm--------------------------------------------------------
submit.addEventListener("click", async function(){
    let hospital_id = hospital.value;
    let employee_id = employee.value;
    let date_joined = dob.value;
    
    const set_employee_hospital = workshop_pages.base_url + "set_hospitals_employee.php";
    const response_employee_hospital = await workshop_pages.getAPI(set_employee_hospital+'?employee_id='+employee_id+'&hospital_id='+hospital_id+'&date_joined='+date_joined);
    if(response_employee_hospital.data['status']=="Hospital-Employee set"){
    location.reload();
}
})

}

workshop_pages.load_statisticspatients = async () => {
    const hospital = document.getElementById('hospital');
    const total = document.getElementById('total');
    const submit = document.getElementById('submit');

    // ----------------------------------Adding Hospitals--------------------------------------------------------
    const get_hospitals = workshop_pages.base_url + "select_hospitals.php";
    const response_hospitals = await workshop_pages.getAPI(get_hospitals);
    let hospitals_array = [];
    
    for( let i = 0; i < response_hospitals.data.length; i++){
        let one_hospital = {
            "hospital_id": response_hospitals.data[i]['id'],
            "hospital_name": response_hospitals.data[i]['name']
          };
        hospitals_array.push(one_hospital);
        let newOption = new Option(response_hospitals.data[i]['name'],response_hospitals.data[i]['id']);
        hospital.add(newOption,undefined);
    }
// --------------------------------Confirm--------------------------------------------------------
submit.addEventListener("click", async function(){
    let hospital_id = hospital.value;
    
    
    const get_count = workshop_pages.base_url + "statistics_patients_hospitals.php";
    const response = await workshop_pages.getAPI(get_count+'?hospital_id='+hospital_id);

    total.innerText = response.data['Patients'];
    
})
}

workshop_pages.load_services = async () => {
    const service = document.getElementById('service');
    const status = document.getElementById('status');
    const submit = document.getElementById('submit');

    // ----------------------------------Adding Services--------------------------------------------------------
    const get_services = workshop_pages.base_url + "select_services_null.php";
    const response_services = await workshop_pages.getAPI(get_services);
    let services_array = [];
    
    for( let i = 0; i < response_services.data.length; i++){
        const get_patient = workshop_pages.base_url + "select_patient.php";
        const response_patient = await workshop_pages.getAPI(get_patient+'?id='+response_services.data[i]['patient_id']);
        let one_service = {
            "service_id": response_services.data[i]['id'],
            "patient_id": response_services.data[i]['patient_id'],
            "service_description": response_services.data[i]['description'],
            "patient_name": response_patient.data['name']
          };
        services_array.push(one_service);
        let newOption = new Option(response_services.data[i]['description']+" for "+response_patient.data['name'],response_services.data[i]['id']);
        service.add(newOption,undefined);
    }
// --------------------------------------Confirm---------------------------------------------------
submit.addEventListener("click", async function(){
    let service_id = service.value;
    let status_value = status.value;
    
    const set_service_status = workshop_pages.base_url + "set_status_service.php";
    const response_service_status = await workshop_pages.getAPI(set_service_status+'?id='+service_id+'&status='+status_value);
    if(response_service_status.data['status']=="Status set"){
    location.reload();
}
})
}

workshop_pages.load_out = async () => {
    let out = document.getElementById('out');
    out.addEventListener("click", function(){
        localStorage.clear();
        location.replace("main.html")
    })
}

workshop_pages.load_editinfoemployee = async () => {
    const SSN = document.getElementById('SSN'); 
    const position = document.getElementById('position');
    const gender = document.getElementById('gender');
    const submit = document.getElementById('submit');
    const user_id = window.localStorage.getItem('user_id');

    submit.addEventListener("click", async function(){
        let SSN_value = SSN.value;
        let position_value = position.value;
        let gender_value = gender.value; 

        const get_employee = workshop_pages.base_url + "add_info_employee.php";
        const response_employee = await workshop_pages.getAPI(get_employee+'?SSN='+SSN_value+'&position='+position_value+'&gender='+gender_value+'&user_id='+user_id);
        
    })
    
}

workshop_pages.load_insertserviceemployee = async () => {
    const description = document.getElementById('description'); 
    const cost = document.getElementById('cost');
    const department_id = document.getElementById('department_id');
    const patient = document.getElementById('patient');
    const status = document.getElementById('status');
    const submit = document.getElementById('submit');
    
    const user_id = window.localStorage.getItem('user_id');
// ----------------------------------Adding Patients--------------------------------------------------------
const get_patients = workshop_pages.base_url + "select_patients.php";
const response_patients = await workshop_pages.getAPI(get_patients);
let patients_array = [];

for( let i = 0; i < response_patients.data.length; i++){
    let one_patient = {
        "patient_id": response_patients.data[i]['id'],
        "patient_name": response_patients.data[i]['name']
      };
    patients_array.push(one_patient);
    let newOption = new Option(response_patients.data[i]['name'],response_patients.data[i]['id']);
    patient.add(newOption,undefined);
}

// --------------------------------Confirm---------------------------------------------------
    submit.addEventListener("click", async function(){
        let description_value = description.value;
        let cost_value = cost.value;
        let department_id_value = department_id.value;
        let patient_value = patient.value;
        let status_value = status.value;

        const get_service = workshop_pages.base_url + "insert_service_employee.php";
        const response_service = await workshop_pages.getAPI(get_service+'?description='+description_value+'&cost='+cost_value+'&patient_id='+patient_value+'&employee_id='+user_id+'&department_id='+department_id_value+'&status='+status_value);
        if(response_service.data['status'] == "success"){
            location.reload();
        }

    })



}

workshop_pages.load_editinfopatient = async () => {
    const EHR = document.getElementById('EHR'); 
    const gender = document.getElementById('gender');
    const blood_type = document.getElementById('blood_type');
    const submit = document.getElementById('submit');

    const user_id = window.localStorage.getItem('user_id');

    submit.addEventListener("click", async function(){
        let EHR_value = EHR.value;
        let gender_value = gender.value;
        let blood_type_value = blood_type.value; 

        const get_patient = workshop_pages.base_url + "add_info_patient.php";
        const response_patient = await workshop_pages.getAPI(get_patient+'?EHR='+EHR_value+'&gender='+gender_value+'&blood_type='+blood_type_value+'&user_id='+user_id);
        if(response_patient.data['status'] == "Info added"){
            location.reload();
            
        }
        
    })

}

workshop_pages.load_medication = async () => {
    const medication = document.getElementById('medication'); 
    const quantity = document.getElementById('quantity');
    const submit = document.getElementById('submit');

    const user_id = window.localStorage.getItem('user_id');

    // ----------------------------------Adding Medicines--------------------------------------------------------
    const get_medicines = workshop_pages.base_url + "select_medicines.php";
    const response_medicines = await workshop_pages.getAPI(get_medicines);
    let medicines_array = [];
    
    for( let i = 0; i < response_medicines.data.length; i++){
        let one_medicine = {
            "medicine_id": response_medicines.data[i]['id'],
            "medicine_name": response_medicines.data[i]['name'],
            "medicine_cost": response_medicines.data[i]['cost']
          };
        medicines_array.push(one_medicine);
        let newOption = new Option(response_medicines.data[i]['name'] + " "+response_medicines.data[i]['cost']+ " $",response_medicines.data[i]['id']);
        medication.add(newOption,undefined);

}
    submit.addEventListener("click", async function(){
        let medication_value = medication.value;
        let quantity_value = quantity.value;

        const get_medicine = workshop_pages.base_url + "insert_medication.php";
        const response_medicine = await workshop_pages.getAPI(get_medicine+'?medication_id='+medication_value+'&user_id='+user_id+'&quantity='+quantity_value);
        if(response_medicine.data['status'] == "success"){
        location.reload();
        
    }
    
})

}

workshop_pages.load_insertservicepatient = async () => {
    const description = document.getElementById('description'); 
    const cost = document.getElementById('cost');
    const department_id = document.getElementById('department_id');
    const employee = document.getElementById('employee');
    const submit = document.getElementById('submit');
    
    const user_id = window.localStorage.getItem('user_id');

    // ----------------------------------Adding Employees--------------------------------------------------------
    const get_employees = workshop_pages.base_url + "select_employees.php";
    const response_employees = await workshop_pages.getAPI(get_employees);
    let employees_array = [];

    for( let i = 0; i < response_employees.data.length; i++){
        let one_employee = {
            "employee_id": response_employees.data[i]['id'],
            "employee_name": response_employees.data[i]['name']
        };
        employees_array.push(one_employee);
        let newOption = new Option(response_employees.data[i]['name'],response_employees.data[i]['id']);
        employee.add(newOption,undefined);
}

// --------------------------------Confirm---------------------------------------------------
    submit.addEventListener("click", async function(){
        let description_value = description.value;
        let cost_value = cost.value;
        let department_id_value = department_id.value;
        let employee_value = employee.value;
        

        const get_service = workshop_pages.base_url + "insert_service.php";
        const response_service = await workshop_pages.getAPI(get_service+'?description='+description_value+'&cost='+cost_value+'&patient_id='+user_id+'&employee_id='+employee_value+'&department_id='+department_id_value);
        if(response_service.data['status'] == "success"){
        location.reload();
    }

})

}

workshop_pages.load_beds = async () => {
    const department = document.getElementById('department');
    const room = document.getElementById('room');
    const bed = document.getElementById('bed');
    const submit = document.getElementById('submit');
    const user_id = window.localStorage.getItem('user_id');
    const date_entered = document.getElementById('date_entered');
    const date_left = document.getElementById('date_left');

// -----------------Getting Hospital----------------------------

    const get_hospital = workshop_pages.base_url + "select_hospital_patient.php";
    const response = await workshop_pages.getAPI(get_hospital+'?id=' + user_id);

    const hospital_id = response.data['hospital_id'];

// -----------------Getting Departments----------------------------

    const get_departments = workshop_pages.base_url + "select_departments.php";
    const response_departments = await workshop_pages.getAPI(get_departments+'?hospital_id=' + hospital_id);
    for( let i = 0; i < response_departments.data.length; i++){
        let newOption = new Option(response_departments.data[i]['name'],response_departments.data[i]['id']);
        department.add(newOption,undefined);
        }
// -----------------Getting Rooms----------------------------
    let department_value = department.value;
    const get_rooms = workshop_pages.base_url + "select_rooms.php";
    const response_rooms = await workshop_pages.getAPI(get_rooms+'?department_id=' + department_value);
    
    for( let i = 0; i < response_rooms.data.length; i++){
        let newOption = new Option(response_rooms.data[i]['room_number'],response_rooms.data[i]['id']);
        room.add(newOption,undefined);

        }
        
// -----------------Getting Beds----------------------------
let room_value = room.value;
    const get_beds = workshop_pages.base_url + "select_beds.php";
    const response_beds = await workshop_pages.getAPI(get_beds+'?department_id=' +department_value+'&hospital_id='+hospital_id+'&room_id='+room_value);
    
    for( let i = 0; i < response_beds.data.length; i++){
        let newOption = new Option(response_beds.data[i]['id'],response_beds.data[i]['id']);
        bed.add(newOption,undefined);
}
// -----------------Confirm-----------------------------

submit.addEventListener("click", async function(){
    room_value = room.value;
    department_value = department.value;
    let bed_value = bed.value;
    let date_entered_value = date_entered.value;
    let date_left_value = date_left.value;

    const get_user_department = workshop_pages.base_url + "insert_user_department.php";
    const response_user_department = await workshop_pages.getAPI(get_user_department+'?department_id='+department_value+'&user_id='+user_id+'&hospital_id='+hospital_id);

    const get_change_bed = workshop_pages.base_url + "change_bed.php";
    const response_change_bed = await workshop_pages.getAPI(get_change_bed+'?bed_id='+bed_value+'&taken= 1');

    const get_user_room = workshop_pages.base_url + "insert_user_room.php";
    const response_user_room = await workshop_pages.getAPI(get_user_room+'?bed_id='+bed_value+'&user_id= '+user_id+'&room_id='+room_value+'&datetime_entered='+date_entered_value+'&datetime_left='+date_left_value);
    if(response_user_room.data['status'] == "success"){
    location.reload();
    
}


})



}

workshop_pages.load_invoice = async () => {
    const total = document.getElementById('total');
    const submit = document.getElementById('submit');
    const submit_invoice = document.getElementById('submit_invoice');
    let total_calculated = 0;

    const user_id = window.localStorage.getItem('user_id');

    submit.addEventListener("click", async function(){

    const get_service = workshop_pages.base_url + "select_services_approved.php";
    const response = await workshop_pages.getAPI(get_service+'?id=' + user_id);
    for( let i = 0; i < response.data.length; i++){
        total_calculated += Number(response.data[i]['cost']);
    }
    total.innerHTML = total_calculated + " $"

})
submit_invoice.addEventListener("click", async function(){

    const get_hospital = workshop_pages.base_url + "select_hospital_patient.php";
    const response_hospital = await workshop_pages.getAPI(get_hospital+'?id=' + user_id);
    const hospital_id = response_hospital.data['hospital_id'];
    let date = new Date();
    
    const get_invoive = workshop_pages.base_url + "insert_invoice.php";
    const response_invoice = await workshop_pages.getAPI(get_invoive+'?user_id=' + user_id+'&hospital_id='+hospital_id+'&total_amount='+total_calculated+'&date_issued='+date);
    console.log(response_invoice.data)
})
    
}
