const $body = document.getElementsByTagName('body')[0];

let popUp = document.createElement('div');
popUp.innerHTML = `<div class='popUp-header'>
    INGRESÁ TU MAIL Y RECIBI DESCUENTOS ÚNICOS
    </div>
    <i class='closePopUp'>✖</i>
    <div class='popUp-body'>
        <form class='popUp-form'>
            <input type='email'/>
            <button>
                SUSCRIBIRME!
            </button>
        </form>
    </div>`;

    const showPopUp = ()=>{
        popUp.classList.add('popUpMail');
        $body.appendChild(popUp);
        let close_button = popUp.querySelector('.closePopUp');
        close_button.addEventListener('click',()=>{
            $body.removeChild(popUp);
        })
}


setTimeout(showPopUp,3000)
