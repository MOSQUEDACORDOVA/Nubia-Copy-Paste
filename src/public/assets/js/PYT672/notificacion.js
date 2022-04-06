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
        
    } else if (notif === "Grupo Eliminado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Grupo Eliminado !';
        toastText.innerText = 'Grupo Eliminado satisfactoriamente !';
        
    } else if (notif === "Grupo Agregado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Grupo Creado !';
        toastText.innerText = 'Estimado usuario, el grupo fue creado satisfactoriamente';
        
    } else if (notif === "Grupo Actualizado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Grupo Actualizado !';
        toastText.innerText = 'Estimado usuario, el grupo fue actualizado satisfactoriamente';
        
    } else if (notif === "Usuario Registrado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Usuario Registrado !';
        toastText.innerText = 'Estimado usuario, el usuario fue registrado satisfactoriamente';

    } else if (notif === "Usuario Eliminado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Usuario Eliminado !';
        toastText.innerText = 'Estimado usuario, el usuario fue eliminado satisfactoriamente';

    } else if (notif === "ComentarioProf") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Comentario !';
        toastText.innerText = 'Estimado usuario, se guardó su comentario con éxito';
        
    } else if (notif === "Usuario Estado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Usuario Habilitado/Deshabilitado !';
        toastText.innerText = 'El usuario se actualizo satisfactoriamente';
        
    } else if (notif === "Usuario Activado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Usuario Activado !';
        toastText.innerText = 'Estimado usuario, se guardaron sus cambios satisfactoriamente';
        
    } else if (notif === "Usuario Desactivado") {
        toastContainer.classList.add('bg-primary', 'text-white');
        toastHeaderText.classList.add('text-primary');
        toastHeaderText.innerText = 'Usuario Desactivado !';
        toastText.innerText = 'Estimado usuario, se guardaron sus cambios satisfactoriamente';

    }

    btnToast.click();
}