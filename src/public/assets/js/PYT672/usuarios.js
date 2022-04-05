let usuariosTable = $('#usuarios'), usuarios;

function FetchData () {
  fetch('/obtenerusuariospy672')
      .then(response => response.json())
      .then(data => {
          usuarios = data.usuarios
          cargarTablaUsuarios();
      });
}

FetchData();

function cargarTablaUsuarios() {
  
  if (usuariosTable.length) {
    console.log(usuarios);
    let tableUsuarios = usuariosTable.DataTable({
      ordering: false,
      paging: false,
      data: usuarios,
      columns: [
        { data: 'nombre' },
         // used for sorting so will hide this column
        { data: 'pais' },
        { data: 'telefono' },
        { data: 'puesto' },   
        { data: 'enabled' },     
        {   // Actions 
          targets: -1,
          title: 'Acciones',
          orderable: false,
          render: function (data, type, full, meta) {
            let options = "", enableIcon = ""

            if (parseInt(full['enabled']) === 1) {
              enableIcon = `${feather.icons['user-x'].toSvg()}`
            } else {
              enableIcon = `${feather.icons['user-check'].toSvg()}`
            }

            if (full['puesto'] != "Administrador") {
              options =`
              <div class="d-flex align-items-center">
                <a href="#" class="btn btn-sm ms-1 text-primary" onclick="deleteUser('${full['id']}')">${feather.icons['trash'].toSvg()}</a>
                <a href="#" class="btn btn-sm text-primary" onclick="enabledDisUser('${full['id']}','${full['enabled']}')">${enableIcon}</a>
                <a href="#" class="dropdown-toggle text-center ms-1 text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown">
                  ${feather.icons['more-vertical'].toSvg()}
                </a>
  
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-popper-placement="bottom-start">
                  <a class="dropdown-item" href="#" onclick="edituser('${full['id']}')">
                    Editar
                  </a>
                </div>
                
                
              </div>`
            }
            return options;
          }
        },
      ],
      columnDefs: [
        {
          targets: 3, render: function (data, type, full) {
              let puesto = full.puesto;
              if(puesto === "Vendedor") {
                  puesto = `<span class="badge badge-light-warning">${puesto}</span>`
              } else if(puesto === "Administrador") {
                  puesto = `<span class="badge badge-light-success">${puesto}</span>`
              } else {
                  puesto = `<span class="badge badge-light-info">${puesto}</span>`
              }
              return puesto;
          }
        },
        {
          targets: 4, render: function (data, type, full) {
              let estado
              if(data === "0") {
                  estado = `<span class="badge badge-light-warning">Inactivo</span>`
              } else {
                estado = `<span class="badge badge-light-success">Activo</span>`
              }
              return estado;
          }
        },
        
      ],
      order: [[2, 'desc']],
      dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 5,
      lengthMenu: [5, 10, 25, 50, 75, 100],
      language: {
      "decimal": "",
      "emptyTable": "No existen usuarios",
      "info": "Total _TOTAL_ usuarios",
      "infoEmpty": "Total _TOTAL_ usuarios",
      "infoFiltered": "(Filtrado de _MAX_ usuarios totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });
    $('div.head-label').html('<h6 class="mb-0">Usuarios Registrados</h6>');
    document.getElementById('usuarios_info').classList.add('py-2')
    document.getElementById('usuarios_info').parentElement.parentElement.classList.add('align-items-center')
  }

}

let regUserForm = document.getElementById('regUsuarioForm')

regUserForm.addEventListener('submit', e => {
  e.preventDefault();
  let data = new FormData(regUserForm);
  if ($('#user-id').length > 0) {    
    EditarUsuario(data);
  } else {
  RegistrarUsuario(data);
  }
  
});

function RegistrarUsuario (data) {
  fetch('/reguserpy672', {
      method: 'POST',
      body: data, 
  }).then(res => res.json())
      .catch(error => {
          console.error('Error:', error);
          Toast("Error");
      })
      .then(response => {
          console.log('Success:', response)
          $('#registrarUsuario .resetBtn').click();
          $('#registrarUsuario .btn-close').click();
          Toast("Usuario Registrado");
          UpdateTables();
      });
}
function EditarUsuario (data) {
  fetch('/editUserpy672', {
      method: 'POST',
      body: data, 
  }).then(res => res.json())
      .catch(error => {
          console.error('Error:', error);
          Toast("Error");
      })
      .then(response => {
          console.log('Success:', response)
          $('#registrarUsuario .resetBtn').click();
          $('#registrarUsuario .btn-close').click();
          Toast("Usuario Actualizado");
          UpdateTables();
      });
}
function deleteUser (id) {
  let data = new FormData(regUserForm);
  data.append('id_usuario', id)
  fetch('/deleteUserpy672', {
      method: 'POST',
      body: data, 
  }).then(res => res.json())
      .catch(error => {
          console.error('Error:', error);
          Toast("Error");
      })
      .then(response => {
          console.log('Success:', response)
          Toast("Usuario Eliminado");
          UpdateTables();
      });
}
function enabledDisUser (id, estadoA) {
  let data = new FormData();
  let newEstado, estadoToast
  if (estadoA == 1) {
    newEstado = 0
    estadoToast = "Usuario Desactivado"
  }else{
    newEstado = 1
    estadoToast = "Usuario Activado"
  }
  data.append('id_usuario', id)
  data.append('estado', newEstado)
  fetch('/enabledDisUser', {
      method: 'POST',
      body: data, 
  }).then(res => res.json())
      .catch(error => {
          console.error('Error:', error);
          Toast("Error");
      })
      .then(response => {
          console.log('Success:', response)
          Toast(estadoToast);
          UpdateTables();
      });
}
function edituser (id) {
  let filteruser = usuarios.filter(
    (element) => element.id == id
  );
  console.log(filteruser);
  $("#id-user-edit").empty()
  $("#id-user-edit").append(
    `<input type="text" value="${filteruser[0]["id"]}" name="id_usuario" id="user-id" hidden>`
  );

  $("#nombre-user").val(`${filteruser[0]["nombre"]}`);
  $("#apellidos-user").val(``);
  $("#dni-user").val(`${filteruser[0]["dni"]}`);
  $("#email-user").val(`${filteruser[0]["email"]}`);
  $("#pais-user").val(`${filteruser[0]["pais"]}`);
  $("#fechaN-user").val(`${filteruser[0]["fecha_nacimiento"]}`);
  $("#fechaI-user").val(`${filteruser[0]["fecha_inicio"]}`);
  $("#telefono-user").val(`${filteruser[0]["telefono"]}`);
  $(`#puesto-user option[value='${filteruser[0]["puesto"]}']`).attr(
    "selected",
    true
  );
  $("#puesto-user").val(`${filteruser[0]["puesto"]}`).trigger("change");

  $("#registrarUsuario").modal("show");
}

function UpdateTables() {
  $('#usuarios').dataTable().fnDestroy();
  $('#usuarios').empty();
  $('#usuarios').html(`
  <thead>
  <tr role="row">
      <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
          style="width: 389px;" aria-label="Nombre: activate to sort column ascending">Nombre</th>
      <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
          style="width: 376px;" aria-label="Email: activate to sort column ascending">País</th>
      <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
          style="width: 389px;" aria-label="Nombre: activate to sort column ascending">Telefono</th>
      <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
          style="width: 376px;" aria-label="Email: activate to sort column ascending">Puesto</th> 
          <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                            style="width: 376px;" aria-label="Email: activate to sort column ascending">Estado</th>       
      <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 148.6px;padding-left: 2.5rem;" aria-label="Acciones">Acciones</th>
  </tr>
                                </thead>`);
  
  FetchData();
}

$(function () {
  /*$('.borrar-btn').on('click', (e)=>{
    let data = e.target.childNodes[1];
    data.submit()
  });

  $('.congelar-estudiante').on('click', (e)=>{
    console.log(e.target)
    let form = e.target;
    form.submit();
  });
  
  $('.eliminar-estudiante-grupo').on('click', (e)=>{
    console.log(e.target)
    let form = e.target;
  });*/
});

