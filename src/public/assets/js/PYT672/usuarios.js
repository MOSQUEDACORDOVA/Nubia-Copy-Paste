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
    
    let tableUsuarios = usuariosTable.DataTable({
      data: usuarios,
      columns: [
        { data: 'nombre' },
        { data: 'dni' }, // used for sorting so will hide this column
        { data: 'email' },
        { data: 'pais' },
        { data: 'puesto' },
        { data: 'fecha_nacimiento' },
        { data: 'fecha_inicio' },
        {   // Actions
          targets: -1,
          title: 'Acciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return `
            <div class="d-flex align-items-center">
              <a href="#" class="btn btn-sm ms-1 text-primary">${feather.icons['trash'].toSvg()}</a>
              <a href="#" class="dropdown-toggle text-center text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown">
                ${feather.icons['more-vertical'].toSvg()}
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-popper-placement="bottom-start">
                <a class="dropdown-item" href="#">
                  Eliminar Grupo
                </a>
              </div>
              
            </div>`;
          }
        },
      ],
      columnDefs: [
        {
          targets: 0, render: function (data, type, full) {
              let nombre = full.nombre;
              return nombre
          }
        },
        {
          targets: 1, render: function (data, type, full) {
              let dni = full.dni;
              return dni
          }
        },
        {
          targets: 2, render: function (data, type, full) {
              let email = full.email;
              return email
          }
        },
        {
          targets: 3, render: function (data, type, full) {
              let pais = full.pais;
              return pais
          }
        },
        {
          targets: 4, render: function (data, type, full) {
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
          targets: 5, render: function (data, type, full) {
              let nacimiento = full.fecha_nacimiento;
              return `
              <span class="badge badge-light-primary">${nacimiento}</span>
              `;
          }
        },
        {
          targets: 6, render: function (data, type, full) {
              let inicio = full.fecha_inicio;
              if(inicio === null) {
                  inicio = '<span class="badge badge-light-danger">No Establecida</span>'
              } else {
                  inicio = `<span class="badge badge-light-primary">${inicio}</span>`;
              }
              return inicio;
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
  RegistrarUsuario(data);
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

function UpdateTables() {
  $('#usuarios').dataTable().fnDestroy();
  $('#usuarios').empty();
  $('#usuarios').html(`
  <thead>
      <tr>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Email</th>
          <th>País</th>
          <th>Puesto</th>
          <th>F. Nacimiento</th>
          <th>F. Inicio</th>
          <th>Acciones</th>
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