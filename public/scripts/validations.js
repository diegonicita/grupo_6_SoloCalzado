//REGISTER VALIDATION
let $regForm = d.getElementsByClassName('reg-form')[0],
inputs = $regForm.querySelectorAll('input'),
$firstName = d.getElementById('firstName'),
$lastName = d.getElementById('lastName') ,
$user = d.getElementById('user'),
$password = d.getElementById('regEmail'),
$avatar = d.getElementById('avatar'),
inputsArray = [$firstName,$lastName,$user,$password,$avatar];


const checkField = (input) => {   
    if (input.value.trim() == ''){
        setError(input,'Debes completar el campo')
    } else {
        setSuccess(input)
    }
}

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

inputs.forEach(input => {
    input.addEventListener('blur', ()=>{
    checkField(input)});  
})



//REGISTER VALIDATION

//CRUD VALIDATION