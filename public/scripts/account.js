let d = document;
let $editBtn = document.getElementById('editBtn');
let $saveBtn = document.getElementById('saveBtn');
let $editInputs = document.querySelectorAll('.editInput');

$editBtn.addEventListener('click', enableInputs);

function enableInputs(){
    $editInputs.forEach(function(input){
        input.removeAttribute('disabled');
    });
    $editBtn.setAttribute('disabled','')
}