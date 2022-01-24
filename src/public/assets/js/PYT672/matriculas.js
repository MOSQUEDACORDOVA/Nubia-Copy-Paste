let matriculaTable = $('.matricula');

function cargarTablaMatricula(editada) {

  let estudiantes = $('#arrayEstudiantes').val()
  
  let estudiantesParsed = ""
  if (editada) {
    
    estudiantesParsed = JSON.parse(estudiantes)

  }else{
    estudiantesParsed = JSON.parse(estudiantes.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // --------------------------------------------------------------------
 
  if (matriculaTable.length) {
    
    var tableMatr = matriculaTable.DataTable({
      data: estudiantesParsed,
      columns: [
        { data: 'nombre' },
        { data: 'email' }, // used for sorting so will hide this column
        { data: 'grupoId' },
        { data: 'vendedores' },
        { data: 'estado' },
        {   // Actions
          targets: -1,
          title: 'Acciones',
          orderable: false,
          render: function (data, type, full, meta) {
            let congelado = '', añadirGrupo = '';
            if(full['grupo'] !== null) {

              if(full['estado']['id'] === 1) {
                congelado = `
                  <a class="dropdown-item" href="#">
                    <form action="/congelarestudiantepy672" method="POST">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                        Congelar
                    </form>
                  </a>
                  <a class="dropdown-item eliminar-estudiante-grupo" href="#">
                    <form action="/eliminarestudiantedegrupopy672" method="POST">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                        Eliminar de Grupo
                    </form>
                  </a>`;
              } else {
              congelado = `
                <a class="dropdown-item" href="#">
                  <form action="/activarestudiantecongeladopy672" method="POST">
                      <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                      Activar
                  </form>
                </a>
                <a class="dropdown-item eliminar-estudiante-grupo" href="#">
                <form action="/eliminarestudiantedegrupopy672" method="POST">
                    <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                    Eliminar de Grupo
                  </form>
                </a>`;
              }
              
            } else {
              congelado = `
                <a class="dropdown-item" href="#">
                    Añadir Grupo
                </a>`;
            }
            return (
              `<div class="d-inline-flex align-items-center">
                <div role="button" class="text-primary borrar-btn me-1">
                    <form action="/borrarestudiantespy672" method="POST" id="form${full['id']}">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                        
                        ${feather.icons['trash'].toSvg()}
                    </form>
                </div>
                <div class="">
                    <a href="#" class="dropdown-toggle text-center text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown">
                      ${feather.icons['more-vertical'].toSvg()}
                    </a>
                    <div class="dropdown-menu congelar-estudiante" aria-labelledby="dropdownMenuButton" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px);">
                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#createAppModal">
                          Reasignar Grupo
                        </a>
                        ${añadirGrupo}
                        ${congelado}
                    </div>
                </div>
              </div>`  
            );
          }
        },
      ],
      columnDefs: [
        {
          targets: 0, render: function (data, type, full) {
            let nombreAlumno = full.nombre +" "+ full.apellidos;
            return nombreAlumno
          }
        },
        {
          targets: 2, render: function (data, type, full) {
          let grupo; 
          if (full['grupo']) {
            grupo = `
            <div class="badge-wrapper me-1">
                <span class="badge rounded-pill badge-light-primary">${full['grupo']['identificador']}</span>
            </div>`;
          } else {
            grupo = `
            <div class="badge-wrapper me-1">
                <span class="badge rounded-pill badge-light-secondary">No pertenece a un grupo</span>
            </div>`;
          }
          
          return grupo
          }
        },
        {
          targets: 3, render: function (data, type, full) {
              let vendedor = '<span class="badge badge-light-info">Sin Vendedor</span>';
              /*if(inicio === null) {
                  inicio = '<span class="badge badge-light-danger">No Establecida</span>'
              } else {
                  inicio = `<span class="badge badge-light-primary">${inicio}</span>`;
              }*/
              return vendedor;
          }
        },
        {
          targets: 4, render: function (data, type, full) {
            let estado;
            if(full['estado']['id'] === 1) {
              estado = `
                <div class="badge-wrapper me-1">
                  <span class="badge rounded-pill badge-light-success">${full['estado']['estado']}</span>
                </div>
              `; 
            } else if(full['estado']['id'] === 5) {
              estado = `
                <div class="badge-wrapper me-1">
                  <span class="badge rounded-pill badge-light-danger">${full['estado']['estado']}</span>
                </div>
              `; 
            }
            
            return estado
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
      "emptyTable": "No existen alumos",
      "info": "Total _TOTAL_ alumnos",
      "infoEmpty": "Total _TOTAL_ alumnos",
      "infoFiltered": "(Filtrado de _MAX_ alumnos totales)",
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
    $('div.head-label').html('<h6 class="mb-0">Alumnos inscritos</h6>');
    document.getElementById('matricula_info').classList.add('py-2')
    document.getElementById('matricula_info').parentElement.parentElement.classList.add('align-items-center')
  }

}

$(function () {
  'use strict';
  cargarTablaMatricula()
 
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

    
  $('.borrar-btn').on('click', (e)=>{
    
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
  });
});
