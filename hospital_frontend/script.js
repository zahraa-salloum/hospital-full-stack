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