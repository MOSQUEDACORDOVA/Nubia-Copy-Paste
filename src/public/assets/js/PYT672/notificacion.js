function Toast (notif) {
    let toast = document.getElementById('toast'),
    toastContainer = document.querySelector('#toast .basic-toast'),
    toastHeaderText = document.querySelector('#toast .toast-header strong'),
    toastText = document.querySelector('#toast .toast-body'),
    btnToast = document.getElementById('btnToast');

    if(toastContainer.classList.contains('bg-primary')) {    
    toastContainer.classList.remove('bg-primary', 'text-white');
        toastHeaderText.classList.remove('text-primary');
    }
    if(toastContainer.classList.contains('bg-danger')) {
        toastContainer.classList.remove('bg-danger', 'text-white');
        toastHeaderText.classList.remove('text-danger');
    }

    if(notif === "Nota") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Nota Guardada !';
        toastText.innerText = 'Estimado usuario, hemos guardado sus cambios correctamente';
    } else if (notif === "Participacion") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Participacion Guardada !';
        toastText.innerText = 'Estimado usuario, hemos guardado sus cambios correctamente';
        
    } else if (notif === "Asistencia") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Asistencia Guardada !';
        toastText.innerText = 'Estimado usuario, hemos guardado sus cambios correctamente';

    } else if (notif === "Error") {
        toastContainer.classList.add('bg-danger', 'text-white');
        toastHeaderText.classList.add('text-danger');
        toastHeaderText.innerText = 'Lo sentimos, algo ah ocurrido !';
        toastText.innerText = 'Estimado usuario, se presento un error al realizar la tarea';
    }
    btnToast.click();
}