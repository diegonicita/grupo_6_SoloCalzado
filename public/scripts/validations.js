//REGISTER VALIDATION
var d = document;
let $regForm = d.getElementsByClassName('reg-form')[0],
$firstName = d.getElementById('firstName'),
$lastName = d.getElementById('lastName') ,
$user = d.getElementById('user'),
$password = d.getElementById('password'),
$email = d.getElementById('regEmail'),
$profileEmail = d.getElementById('email'),
$avatar = d.getElementById('avatar'),
$usuarioLogin = d.getElementById('usuario');
$title = d.getElementById('title');
$description = d.getElementById('description');
$images = d.getElementById('images');

regInputs = [$firstName,$lastName,$user,$password,$email];
loginInputs = [$usuarioLogin,$password];
profileInputs = [$firstName,$lastName,$profileEmail];
productsInputs = [$title,$description];

// CHECK FIELD FUNCTION
const checkFieldRegister = (input) => {   
    if (input.value.trim() == ''){
        setError(input,'Debes completar el campo')
    } else {
        setSuccess(input)
    }
    if (input == $firstName || input == $lastName){
        if (input.value.trim().length >= 2){
            setSuccess(input);
        }
        else {
            setError(input,'Debes ingresar al menos 2 caracteres');
        }
    }
    if (input == $email){
        let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emailValidator.test(input.value.trim())){
            setSuccess(input)
        } else {
            setError(input,'Debes ingresar un mail válido')
        }
    }
    if (input == $password){
        let strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (input.value.trim().length >= 8){
            if (strongPassword.test(input.value.trim())) {
                setSuccess(input);
            } else {
                setError(input,'Debes incluir una letra mayúscula, minúscula y un número');
            };
        }
        else {
            setError(input,'Debes ingresar al menos 8 caracteres');
        };
    } 
    if (input == $avatar){
        // debugger
        // console.log(input)
    }    
}

const checkFieldLogin = (input) => {
    if (input.value.trim() == ''){
        setError(input,'Debes completar el campo')
    } else {
        setSuccess(input)
    }
}
const checkFieldProducts = (input) => {
    if (input.value.trim() == ''){
        setError(input,'Debes completar el campo')
    } else {
        setSuccess(input)
    }
    if (input == $title){
        if (input.value.trim().length >= 5){
            setSuccess(input);
        }
        else {
            setError(input,'Debes ingresar al menos 5 caracteres');
        }
    }
    if (input == $description){
        if (input.value.trim().length >= 20){
            setSuccess(input);
        }
        else {
            setError(input,'Debes ingresar al menos 20 caracteres');
        }
    }
}


// ERROR & SUCCESS

const setError = (field, message) => {
    const inputControl = field.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMsg');

    errorDisplay.innerText = message;
    field.classList.add('error');
    field.classList.remove('success')
}

const setSuccess = field => {
    const inputControl = field.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMsg');

    errorDisplay.innerText = '';
    field.classList.add('success');
    field.classList.remove('error');
};

// IMPLEMENTATION

regInputs.forEach(input => {
    if (input != null)
    input.addEventListener('blur', ()=>{
    checkFieldRegister(input)});  
})

if ($avatar != null)
$avatar.addEventListener('change', ()=>{
    checkFieldRegister($avatar)
})

loginInputs.forEach(input => {
    if (input != null)
    input.addEventListener('blur', ()=>{
    checkFieldLogin(input)});  
})

profileInputs.forEach(input => {
    if (input != null)
    input.addEventListener('blur', ()=>{
    checkFieldRegister(input)});  
})

productsInputs.forEach(input => {
    if (input != null)
    input.addEventListener('blur', ()=>{
    checkFieldProducts(input)});  
})

if ($images != null){
$images.addEventListener('change', ()=>{
    checkFieldProducts($images)
})
}