//LOGIN VALIDATION
let $regForm = d.getElementsByClassName('reg-form')[0],
inputs = $regForm.querySelectorAll('input'),
$firstName = d.getElementById('firstName'),
$lastName = d.getElementById('lastName') ,
$user = d.getElementById('user'),
$password = d.getElementById('regEmail'),
$avatar = d.getElementById('avatar');

const checkField = (e)=>{
    if (e.target === $firstName){
        if($firstName.value.trim() == ''){
            setError($firstName,'Debes completar el campo')
        } else {
            setSuccess($firstName)
        }
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
  input.addEventListener('blur',checkField);  
})

//REGISTER VALIDATION

//CRUD VALIDATION