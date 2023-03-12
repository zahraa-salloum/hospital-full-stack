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
    console.log(hospital_id);
    console.log(patient_id);
    const set_patient_hospital = workshop_pages.base_url + "set_hospital_patient.php";
    const response_patient_hospital = await workshop_pages.getAPI(set_patient_hospital+'?user_id='+patient_id+'&hospital_id='+hospital_id);
    console.log(response_patient_hospital.data);
})

}
