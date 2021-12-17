let d = document,
$editBtn = d.getElementsById('editBtn'),
$saveBtn = d.getElementsById('saveBtn'),
$editInputs = d.querySelectorAll('.editInput');

$editBtn.addEventListener('click', enableInputs);

function enableInputs(){
    $editInputs.forEach(function(input){
        input.removeAttribute('disabled');
    });
    $editBtn.setAttribute('disabled','')
}