var historialTable = $('.historial');

function cargarTablaMatricula(editada) {

  let matricula = $('#arrayMatricula').val()
  
  let matriculaParsed = ""
  if (editada) {
    
    matriculaParsed = JSON.parse(matricula)

  }else{
    matriculaParsed = JSON.parse(matricula.replace(/&quot;/g,'"'))
  }
 if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // --------------------------------------------------------------------
 
  if (historialTable.length) {
    let tableMatr;
    $('.buscar-matricula').on('keyup change', function(){
      tableMatr.search(this.value).draw();   
    });  

    $('.buscar-grupos').on('change', function(){
      tableMatr.search(this.value).draw();   
    });  

    tableMatr = historialTable.DataTable({
      data: matriculaParsed,
      columns: [
        { data: 'nombre' },
        { data: 'grupo' }, // used for sorting so will hide this column
        { data: 'asistencia' },
        { data: 'nota' },
      ],
      columnDefs: [
        {
            targets: 1, render: function (data, type, full) {
                let grupo;
                if(full.grupo) {
                    grupo = `
                    <div class="badge-wrapper me-1">
                        <span class="badge rounded-pill badge-light-primary">${full['grupo']['identificador']}</span>
                    </div>`;
                } else {
                    grupo = `
                    <div class="badge-wrapper me-1">
                        <span class="badge rounded-pill badge-light-secondary">No pertenece a un grupo</span>
                    </div>`
                }
                return grupo
            }
        },
        {
          targets: 2, render: function (data, type, full) {
            let grupo = '-';
            
            return grupo
          }
        },
        {
          targets: 3, render: function (data, type, full) {
            let grupo = '-';
            
            return grupo
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
    $('div.head-label').html('<h6 class="mb-0">Historial</h6>');
    document.getElementById('historial_info').classList.add('py-2')
    document.getElementById('historial_info').parentElement.parentElement.classList.add('align-items-center')
  }

}

$(function () {
  'use strict';
  cargarTablaMatricula()
 
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

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
