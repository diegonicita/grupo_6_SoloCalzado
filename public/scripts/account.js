let d = document;
let $editBtn = document.getElementById('editBtn');
let $saveBtn = document.getElementById('saveBtn');
let $editInputs = document.querySelectorAll('.editInput');
let $password = document.getElementById('password');
let $avatar = document.getElementById('avatar');

$editBtn.addEventListener('click', enableInputs);
$saveBtn.setAttribute('disabled','')

function enableInputs(){
    $editInputs.forEach(function(input){
        input.removeAttribute('disabled');        
    });
    $avatar.removeAttribute('disabled','');
    $password.setAttribute('disabled','');
    $editBtn.setAttribute('disabled','');
    $saveBtn.removeAttribute('disabled','')
}