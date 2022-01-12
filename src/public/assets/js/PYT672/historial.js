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
      ordering: false,
      data: matriculaParsed,
      columns: [
        { data: 'nombre' },
        { data: 'asistencia' },
        { data: 'nota' },
      ],
      columnDefs: [
        {
          targets: 0, render: function (data, type, full) {
            let grupo;
            if(full.grupo) {
              grupo = full.grupo.identificador;
              /*grupo = `
              <div class="badge-wrapper me-1">
              <span class="badge rounded-pill badge-light-primary">${full['grupo']['identificador']}</span>
              </div>`;*/
            } else {
              grupo = "Sin Grupo";
                /*grupo = `
                <div class="badge-wrapper me-1">
                    <span class="badge rounded-pill badge-light-secondary">No pertenece a un grupo</span>
                </div>`;*/
            }

            let nombreEst = `
            <div class="d-flex flex-column btnHistorialDetalles">

              <div class="d-flex align-items-center mb-1">
                <span class="btnHistorialDetalles me-1" type="button" data-grupoid="${full['grupo']['id']}">${full['nombre']} ${full['primer_apellido']}</span>

                <div class="badge rounded-pill badge-light-success me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Presente" data-consulta="presente" role="button">
                  1
                </div>

                <div class="badge rounded-pill badge-light-danger me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Ausentes" data-consulta="ausentes" role="button">
                  0
                </div>

                <div class="badge rounded-pill badge-light-info me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Nivel" data-consulta="nivel" role="button">
                  2
                </div>
               
                <div class="badge rounded-pill badge-light-warning me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Lección" data-consulta="leccion" role="button">
                  7
                </div>
              </div>

              <div class="d-flex align-items-end">
                <div class="me-1">
                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                    <small class="emp_post text-muted">Grupo</small><br><small class="emp_post">${grupo}</small>
                </div>
                <div class="me-1">
                    <span class="item-user me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user font-small-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
                    <small class="emp_post text-muted">Prof.</small><br><small class="emp_post">Mosqueda Cor.</small>
                </div>

                <div class="">
                    <span class="item-clock me-75"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock font-small-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                    
                    <small class="emp_post text-muted">Horario</small><br><small class="emp_post">${full['grupo']['dia_horario']}</small>
                </div>
              </div>
            </div>
            `;
            return nombreEst
          }
        },
        {
          /*targets: 1, render: function (data, type, full) {
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
          }*/
        },
        {
          targets: 1, render: function (data, type, full) {
            let leccionesAusentes = parseFloat(full['asistencias'] * 3.125).toFixed(2);
            let total = parseFloat(100 - leccionesAusentes);

            let notaTotal = `
            <div class="d-flex align-items-center btnHistorialDetalles" type="button" data-grupoid="${full['grupo']['id']}">
              <h6 class="m-0">${total}%</h6>
              <div id="chartPart${full['id']}"></div>
            </div>`;

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
          targets: 2, render: function (data, type, full) {
            let total = full['leccion9'] + full['leccion17'] + full['leccion18'] + full['leccion25'] + full['leccion31'] + full['leccion32'] + full['participacion'];

            let notaTotal = `
            <div class="d-flex align-items-center btnHistorialDetalles" type="button" data-grupoid="${full['grupo']['id']}">
              <h6 class="m-0">${total}%</h6>
              <div id="chart${full['id']}"></div>
            </div>`;

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
    //console.log(item, total, color) 
    let options = {
      chart: {
        width: 100,
        height: 100,
        type: "radialBar"
      },
      
      series: [total],
      colors: [`${color}`],
      
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "40%"
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
              fontSize: "16px",
              show: false,
            },
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
  
  $('.btnHistorialDetalles').on('click', function (){
    console.log(this.getAttribute('data-grupoid'));
    let id = this.getAttribute('data-grupoid');
    $('#btnHistorialDetalles').click();
    /*$.ajax({
      // la URL para la petición
      url : '/obtenerGrupoLeccionActual',
  
      // la información a enviar
      // (también es posible utilizar una cadena de datos)
      data : { idGrupo: id },
  
      // especifica si será una petición POST o GET
      type : 'POST',
  
      // el tipo de información que se espera de respuesta
      dataType : 'json',
  
      // código a ejecutar si la petición es satisfactoria;
      // la respuesta es pasada como argumento a la función
      success : function(json) {
          console.log(json)
      },
  
      // código a ejecutar si la petición falla;
      // son pasados como argumentos a la función
      // el objeto de la petición en crudo y código de estatus de la petición
      error : function(xhr, status) {
          alert('Disculpe, existió un problema');
      },
  
      // código a ejecutar sin importar si la petición falló o no
      complete : function(xhr, status) {
          alert('Petición realizada');
      }
    });*/

  });

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
