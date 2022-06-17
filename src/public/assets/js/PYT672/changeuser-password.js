$(document).ready(function () {
    let usuarios, gruposTodos;

    function FetchData (num) {
      fetch('/obtenerGruposAll')
          .then(response => response.json())
          .then(data => {
              gruposTodos = data;
    
              moment.locale('es');
              gruposTodos.forEach(item => {
                  let format = moment(item.fecha_inicio, "DD-MM-YYYY").format("D MMM YYYY");
                  $('#gruposMenu').append(`<option value="${item.id}">${item.identificador} - ${item.dia_horario} - ${format}</option>`);
              });
              $('#gruposMenu').trigger("change");
          });
    
      if (num === 1) {
        fetch('/obtenerusuariospy672')
            .then(response => response.json())
            .then(data => {
                usuarios = data.usuarios
                let check = usuarios.filter(usuario => usuario.puesto === "Administrador")
                if (check.length < 2) {
                  for (let index = 0; index < usuarios.length; index++) {
                    if (usuarios[index].puesto === "Administrador") {
                      usuarios.splice(index, 1)
                    }
                  }
                }
        });
      }
    }
    
    FetchData(1)
    
});
