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
            <div class="d-flex flex-column">

              <div class="d-flex align-items-center mb-1">
                <span class="me-1 btnHistorialDetalles" data-lecciones-ausentes='${full.fechaLeccionesAusentes}' data-notas='${full.notas}' data-grupoid="${full['grupo']['id']}" data-presente="${full['asistencias']}" data-ausentes="${full['ausentes']}" data-nivel="${full['nivelActualGrupo']}" data-leccion="${full['leccActual']}">${full['nombre']} ${full['primer_apellido']}</span>

                <div class="badge rounded-pill badge-light-success me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Presente" data-consulta="presente" role="button">
                  ${full['asistencias']}
                </div>

                <div class="badge rounded-pill badge-light-danger me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Ausentes" data-consulta="ausentes" role="button">
                  ${full['ausentes']}
                </div>

                <div class="badge rounded-pill badge-light-info me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Nivel" data-consulta="nivel" role="button">
                  ${full['nivelActualGrupo']}
                </div>
               
                <div class="badge rounded-pill badge-light-warning me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Lección" data-consulta="leccion" role="button">
                  ${full['leccActual']}
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
            let leccionesAusentes = parseFloat(full['ausentes'] * 3.125).toFixed(2);
            let total = parseFloat(100 - leccionesAusentes);

            let notaTotal = `
            <div class="d-flex align-items-center btnHistorialDetalles" data-lecciones-ausentes='${full.fechaLeccionesAusentes}' data-notas='${full.notas}' data-grupoid="${full['grupo']['id']}" data-presente="${full['asistencias']}" data-ausentes="${full['ausentes']}" data-nivel="${full['nivelActualGrupo']}" data-leccion="${full['leccActual']}">
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
            <div class="d-flex align-items-center btnHistorialDetalles" data-lecciones-ausentes='${full.fechaLeccionesAusentes}' data-notas='${full.notas}' data-grupoid="${full['grupo']['id']}" data-presente="${full['asistencias']}" data-ausentes="${full['ausentes']}" data-nivel="${full['nivelActualGrupo']}" data-leccion="${full['leccActual']}">
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
  cargarTablaMatricula();
  'use strict';
 
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 
  
  $('.btnHistorialDetalles').on('click', function () {
    let idGrupo = parseInt(this.getAttribute('data-grupoid')), arrayLeccionesAusentes = this.getAttribute('data-lecciones-ausentes'), presentes = parseInt(this.getAttribute('data-presente')), ausentes = parseInt(this.getAttribute('data-ausentes')), nivel = parseInt(this.getAttribute('data-nivel')), leccion = parseInt(this.getAttribute('data-leccion')), notas = this.getAttribute('data-notas');
    
    /*console.log(arrayLeccionesAusentes)
    console.log(presentes)
    console.log(idGrupo)
    console.log(ausentes)
    console.log(nivel)
    console.log(leccion)*/
    if(arrayLeccionesAusentes.includes("[{")) {
      arrayLeccionesAusentes = JSON.parse(arrayLeccionesAusentes);
    }
    /*console.log(notas)
    if(notas.includes("[{")) {
      notas = notas.split(';');
    }
    console.log(notas)*/
    $('#tablaHistorialDetalles').html('');

    let content = new DocumentFragment();

    for (let num = 1; num <= leccion; num++) {
      let row = document.createElement('tr'), td = '', notaLeccion = 0, calif = '';
      
      if(num === 9 || num === 17 || num === 18 || num === 25 || num === 31 || num === 32) {
        calif = `<span class="badge rounded-pill badge-light-primary me-1">${notaLeccion}</span>`;
      } else {
        calif = `<span class="badge rounded-pill badge-light-info me-1">No contiene nota</span>`;
      }
      
      if(arrayLeccionesAusentes.length) {

        let result = arrayLeccionesAusentes.filter((lecc => parseInt(lecc.n_leccion) === num));
        //let resultNotas = arrayLeccionesAusentes.filter((lecc => parseInt(lecc.n_leccion) === num));

        if(result.length && parseInt(result[0].n_leccion) === num) {
          console.log(result)
          td += `
            <tr>
              <td>${num}</td>
              <td>-</td>
              <td>
                  <span class="badge rounded-pill badge-light-danger me-1">Ausente</span>
              </td>
              <td>
                  ${calif}
              </td>
              <td>          
                <div class="btn-group">
                  <a class="btn btn-sm text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    ${feather.icons['folder'].toSvg()}
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#">C21105-1</a>
                      <a class="dropdown-item" href="#">C21101-1</a>
                  </div>
                </div>
              </td>
            </tr>
          `;
        } else {
          td += `
            <tr>
              <td>${num}</td>
              <td>-</td>
              <td>
                  <span class="badge rounded-pill badge-light-success me-1">Presente</span>
              </td>
              <td>
                  ${calif}
              </td>
              <td>
                <div class="btn-group">
                  <a class="btn btn-sm text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    ${feather.icons['folder'].toSvg()}
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#">C21105-1</a>
                      <a class="dropdown-item" href="#">C21101-1</a>
                  </div>
                </div>
              </td>
            </tr>
          `;
        }

      } else {
        td += `
          <tr>
            <td>${num}</td>
            <td>-</td>
            <td>
                <span class="badge rounded-pill badge-light-success me-1">Presente</span>
            </td>
            <td>
              ${calif}
            </td>
            <td>
              <div class="btn-group">
                <a class="btn btn-sm text-primary" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  ${feather.icons['folder'].toSvg()}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">C21105-1</a>
                    <a class="dropdown-item" href="#">C21101-1</a>
                </div>
              </div>
            </td>
          </tr>
        `;
      }
      row.innerHTML = td;
      content.appendChild(row);
    }

    $('#tablaHistorialDetalles').append(content);

    $('#btnHistorialDetalles').click();

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
