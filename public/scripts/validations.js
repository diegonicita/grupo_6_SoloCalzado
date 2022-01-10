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

regInputs = [$firstName,$lastName,$user,$password,$email,$avatar];
loginInputs = [$usuarioLogin,$password];
profileInputs = [$firstName,$lastName,$profileEmail,$avatar];

// CHECK FIELD FUNCTION
const checkField = (input) => {   
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
        debugger
        console.log(input)
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
    checkField(input)});  
})

loginInputs.forEach(input => {
    if (input != null)
    input.addEventListener('blur', ()=>{
    checkField(input)});  
})

profileInputs.forEach(input => {
    if (input != null)
    input.addEventListener('blur', ()=>{
    checkField(input)});  
})

//LOGIN VALIDATION

// let $logForm = d.getElementsByClassName('login-form')[0],
// logInputs = $logForm.querySelectorAll('input'),
// $user = d.getElementById('usuario'),
// $password = d.getElementById('password');

// inputs.forEach(input => {
//     input.addEventListener('blur', ()=>{
//     checkField(input)});  
// })
// let $logForm = d.getElementsByClassName('login-form')[0],
// inputs = $logForm.querySelectorAll('input'),
// $user = d.getElementById('usuario'),
// $password = d.getElementById('password');

// const checkField = (input) => {   
//     if (input.value.trim() == ''){
//         setError(input,'Debes completar el campo')
//     } else {
//         setSuccess(input)
//     }
// }

//CRUD VALIDATION