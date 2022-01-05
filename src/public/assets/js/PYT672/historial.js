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
            let total = 0;

            let notaTotal = `<div id="chartPart${full['id']}"></div>`;

            let color;

            if (total <= 20) {
              color = "#ea5455"
            } else if (total <= 30 && total > 20) {
              color = "#adb5bd"
            } else if (total <= 40 && total > 30) {
              color = "#ffc107"
            } else if (total <= 50 && total > 40) {
              color = "#0dcaf0"
            } else if (total <= 75 && total > 50) {
              color = "#d63384"
            } else if (total > 75) {
              color = "#7367f0";
            }

            let item = document.querySelector(`#chartPart${full['id']}`);
            if(item) {
              SetGrap(item, total, color);
            }

            return notaTotal;
          }
        },
        {
          targets: 3, render: function (data, type, full) {
            let total = full['leccion9'] + full['leccion17'] + full['leccion18'] + full['leccion25'] + full['leccion31'] + full['leccion32'];

            let notaTotal = `<div id="chart${full['id']}"></div>`;

            let color;

            if (total <= 20) {
              color = "#ea5455"
            } else if (total <= 30 && total > 20) {
              color = "#adb5bd"
            } else if (total <= 40 && total > 30) {
              color = "#ffc107"
            } else if (total <= 50 && total > 40) {
              color = "#0dcaf0"
            } else if (total <= 75 && total > 50) {
              color = "#d63384"
            } else if (total > 75) {
              color = "#7367f0";
            }

            let item = document.querySelector(`#chart${full['id']}`);
            if(item) {
              SetGrap(item, total, color);
            }

            return notaTotal;
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
    document.getElementById('historial_filter').classList.add('d-none')
    document.getElementById('historial_info').parentElement.parentElement.classList.add('align-items-center')
  }

  function SetGrap (item, total, color) {
    console.log(item, total, color) 
    let options = {
      chart: {
        width: 150,
        height: 150,
        type: "radialBar"
      },
      
      series: [total],
      colors: [`${color}`],
      
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "55%"
          },
         
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: false,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              color: "#111",
              fontSize: "20px",
              show: true
            }
          }
        }
      },
    
      stroke: {
        lineCap: "round",
      },
      labels: ["Total"]
    };

    let chart = new ApexCharts(item, options);
    if(chart !== null) {
      chart.render();
    }
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
