var d = document;
let $editBtn = document.getElementById('editBtn');
let $saveBtn = document.getElementById('saveBtn');
let $editInputs = document.querySelectorAll('.editInput');
let $accountPassword = document.getElementById('password');
let $accountAvatar = document.getElementById('avatar');

function enableInputs(){
    $editInputs.forEach(function(input){
        input.removeAttribute('disabled');        
    });
    $accountAvatar.removeAttribute('disabled','');
    $accountPassword.setAttribute('disabled','');
    $editBtn.setAttribute('disabled','');
    $saveBtn.removeAttribute('disabled','')
}
if ($editBtn != null)
$editBtn.addEventListener('click', enableInputs);
if ($saveBtn != null)
$saveBtn.setAttribute('disabled','')