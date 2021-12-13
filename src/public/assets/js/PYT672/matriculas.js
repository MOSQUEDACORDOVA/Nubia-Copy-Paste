var matriculaTable = $('.matricula');

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
        {   // Actions
          targets: -1,
          title: 'Acciones',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              `<div class="d-inline-flex">
                <div role="button" class="btn btn-sm btn-outline-danger borrar-btn me-1">
                    <form action="/borrarestudiantespy672" method="POST" id="form${full['id']}">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                        
                        ${feather.icons['trash'].toSvg()}

                    </form>
                </div>
                <div role="button" class="btn btn-sm btn-outline-primary edit-btn">
                    <form action="/borrarestudiantespy672" method="POST">
                        <input type="text" name="id" class="new-todo-item-title form-control d-none" value="${full['id']}" required>
                      
                        ${feather.icons['edit'].toSvg()}
                        
                    </form>
                </div>
              </div>`  
            );
          }  },
      ],
      columnDefs: [
        {
            targets: 0, render: function (data, type, full) {

            let micampo = full.nombre +" "+ full.segundo_apellido;
            return micampo
            }
        },
        {
            targets: 2, render: function (data, type, full) {
            let micampo; 
            if (full['grupo']) {
              micampo = full['grupo']['identificador'];
            } else {
              micampo = '-'
            }
            
            return micampo
            }
        }
       
      ],
      order: [[2, 'desc']],
      dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
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
    /*fetch('/borrarestudiantespy672', {
      method: 'POST',
      body: data
    }).then(function(response) {
        if(response.ok) {
            console.log("SUCCESS")
        } else {
            throw "Error en la llamada Ajax";
        }
    }).catch(function(err) {
        console.log(err);
    });*/
    
  });
});
