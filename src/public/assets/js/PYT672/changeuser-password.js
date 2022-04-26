$(document).ready(function () {
    let usuariosTable = $('#usuarios'), usuarios, gruposTodos;

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
                cargarTablaUsuarios();
        });
      }
    }
    
    FetchData(1)
    
    function cargarTablaUsuarios() {
      if (usuariosTable.length) {
        let tableUsuarios = usuariosTable.DataTable({
          "orderFixed": [[ 0, "asc" ]],
          paging: false,
          data: usuarios,
          columns: [
            { data: 'nombre' },
             // used for sorting so will hide this column
            { data: 'email' },
            { data: 'telefono' },
            { data: 'puesto' },   
            { data: 'enabled' },     
            {   // Actions 
              targets: -1,
              title: 'Acciones',
              orderable: false,
              render: function (data, type, full, meta) {
                let options = ""
    
                if (full['puesto'] != "Administrador") {
                  options =`
                  <a href="#" class="btn btn-sm text-primary changePasswordUser" data-id="${full.id}">${feather.icons['tool'].toSvg()}</a>`
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

    $('#usuarios').on('click', async (e) => {
        if(e.target.classList.contains('changePasswordUser')) {
          let id = e.target.getAttribute('data-id')
          console.log(e.target.getAttribute('data-id'))
          /*const user = await fetch('/getPasswordUser/'+id)
          const userData = await user.json();
          console.log(userData)*/
          $('#idUser').val(id)
          $('#btnModalCambiarPassw').click();
        }
    });
    
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
      
      FetchData(1);
    }
    
});
